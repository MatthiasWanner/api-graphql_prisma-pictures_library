import prisma from "../../lib/prisma";

type Args = { id: string };
type CreateUser = {
  data: {
    userName: string;
    email?: string;
    name?: string;
    lastName?: string;
  };
};

type updateUser = {
  id: string;
  data: {
    userName: string;
    email: string;
    name: string;
    lastName: string;
  };
};

export const userQueries = {
  users: () => {
    return prisma.user.findMany();
  },

  user: (_parent: any, args: Args, _context: any) => {
    return prisma.user.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const userMutations = {
  createUser: async (_parent: any, args: CreateUser, _context: any) => {
    await prisma.user.create({
      data: {
        userName: args.data.userName,
        email: args.data.email,
        name: args.data.name,
        lastName: args.data.lastName,
      },
    });

    const userCreated = await prisma.user.findUnique({
      where: {
        userName: args.data.userName,
      },
    });

    await prisma.profile.create({
      data: {
        bio: "",
        profileImg: "",
        userId: userCreated!.id,
      },
    });

    return userCreated;
  },

  updateUser: async (_parent: any, args: updateUser, _context: any) => {
    return await prisma.user.update({
      where: {
        id: +args.id,
      },
      data: {
        email: args.data.email,
        name: args.data.name,
        lastName: args.data.lastName,
      },
    });
  },

  deleteUser: async (_parent: any, args: Args, _context: any) => {
    const userDeleted = await prisma.user.findUnique({
      where: {
        id: +args.id,
      },
    });

    await prisma.profile.delete({
      where: {
        userId: +args.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: +args.id,
      },
    });

    return userDeleted;
  },
};
