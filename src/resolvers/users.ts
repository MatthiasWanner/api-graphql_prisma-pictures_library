import prisma from "../../lib/prisma";

type CreateUser = {
  userName: string;
  email?: string;
  name?: string;
  lastName?: string;
};

export const userQueries = {
  users: async () => {
    const allUsers = await prisma.user.findMany({
      include: {
        albums: true,
        profile: true,
      },
    });
    console.dir(allUsers, { depth: null });
  },
};

export const userMutations = {
  createUser: async (_parent: any, args: CreateUser, _context: any) => {
    await prisma.user.create({
      data: {
        userName: args.userName,
        email: args.email,
        name: args.name,
        lastName: args.lastName,
      },
    });
    //dev
  },
};
