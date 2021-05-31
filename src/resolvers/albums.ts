import { ALL } from "dns";
import prisma from "../../lib/prisma";

type albumsArgs = { userId: string };
type albumArgs = { id: string };

type CreateAlbum = {
  data: {
    title: string;
    authorId: string;
  };
};

type UpdateAlbum = {
  id: string;
  data: {
    title: string;
    published: boolean;
    content: string[];
    categories: string[];
  };
};

export const albumQueries = {
  albums: (_parent: any, args: albumsArgs, _context: any) => {
    return prisma.album.findMany({
      where: {
        authorId: +args.userId,
      },
      include: {
        content: {
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

  album: async (_parent: any, args: albumArgs, _context: any) => {
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
        published: args.data.published,
        content: {
          connect: args.data.content.map((id) => ({
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

  deleteAlbum: async (_parent: any, args: albumArgs, _context: any) => {
    return await prisma.album.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
