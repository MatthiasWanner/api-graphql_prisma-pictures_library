import prisma from "../../lib/prisma";

type picturesArgs = { userId: string };
type pictureArgs = { id: string };

interface CreatePicture {
  data: {
    title: string;
    url: string;
    description: string;
    ownerId: string;
  };
}

interface updatePicture {
  id: string;
  data: {
    title: string;
    url: string;
    description: string;
  };
}

export const pictureQueries = {
  pictures: (_parent: any, args: picturesArgs, _context: any) => {
    return prisma.picture.findMany({
      where: {
        ownerId: +args.userId,
      },
    });
  },

  picture: (_parent: any, args: pictureArgs, _context: any) => {
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

  updatePicture: async (_parent: any, args: updatePicture, _context: any) => {
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

  deletePicture: async (_parent: any, args: pictureArgs, _context: any) => {
    return await prisma.picture.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
