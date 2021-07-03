import prisma from '../../lib/prisma';
import { CreateAlbum, UpdateAlbum } from './interfaces';

export const albumQueries = {
  AllAlbums: () => {
    return prisma.album.findMany({
      include: {
        pictures: {
          select: {
            title: true,
            url: true,
            description: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  AllUserAlbums: async (
    _parent: any,
    args: { userId: number },
    _context: any
  ) => {
    return await prisma.album.findMany({
      where: {
        authorId: +args.userId,
      },
      include: {
        pictures: {
          select: {
            title: true,
            url: true,
            description: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  OneAlbum: async (_parent: any, args: { id: number }, _context: any) => {
    return await prisma.album.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const albumMutations = {
  createAlbum: async (_parent: any, args: CreateAlbum, _context: any) => {
    return await prisma.album.create({
      data: {
        title: args.data.title,
        authorId: +args.data.authorId,
      },
    });
  },

  updateAlbum: async (_parent: any, args: UpdateAlbum, _context: any) => {
    return await prisma.album.update({
      where: {
        id: +args.id,
      },
      data: {
        title: args.data.title,
        description: args.data.description,
        published: args.data.published,
        pictures: {
          connect: args.data.pictures.map((id) => ({
            id: +id,
          })),
        },
        categories: {
          connect: args.data.categories.map((id) => ({
            id: +id,
          })),
        },
      },
    });
  },

  deleteAlbum: async (_parent: any, args: { id: number }, _context: any) => {
    await prisma.album.delete({
      where: {
        id: +args.id,
      },
    });
    return { message: 'album deleted' };
  },
};
