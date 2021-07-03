import prisma from '../../lib/prisma';
import { CreatePicture, UpdatePicture } from './interfaces';

export const pictureQueries = {
  UserPictures: (_parent: any, args: { userId: string }, _context: any) => {
    return prisma.picture.findMany({
      where: {
        ownerId: +args.userId,
      },
    });
  },

  OnePicture: (_parent: any, args: { id: string }, _context: any) => {
    return prisma.picture.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const pictureMutations = {
  createPicture: async (_parent: any, args: CreatePicture, _context: any) => {
    return await prisma.picture.create({
      data: {
        title: args.data.title,
        url: args.data.url,
        description: args.data.description,
        owner: {
          connect: {
            id: +args.data.ownerId,
          },
        },
      },
    });
  },

  updatePicture: async (_parent: any, args: UpdatePicture, _context: any) => {
    return await prisma.picture.update({
      where: {
        id: +args.id,
      },
      data: {
        title: args.data.title,
        url: args.data.url,
        description: args.data.description,
      },
    });
  },

  deletePicture: async (_parent: any, args: { id: string }, _context: any) => {
    return await prisma.picture.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
