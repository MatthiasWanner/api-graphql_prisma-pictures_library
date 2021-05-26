import prisma from "../../lib/prisma";

type Args = { id: string };

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
    ownerId: string;
  };
}

export const pictureQueries = {
  pictures: () => {
    return prisma.picture.findMany();
  },

  picture: (_parent: any, args: Args, _context: any) => {
    return prisma.picture.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const pictureMutations = {
  createPicture: async (_parent: any, args: CreatePicture, _context: any) => {
    console.log(args);
    return await prisma.picture.create({
      data: {
        title: args.data.title,
        url: args.data.url,
        description: args.data.description,
        ownerId: +args.data.ownerId,
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

  deletePicture: async (_parent: any, args: Args, _context: any) => {
    return await prisma.picture.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
