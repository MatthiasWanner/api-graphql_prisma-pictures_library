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
  users: async () => {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    return allUsers;
  },

  user: async (_parent: any, args: Args, _context: any) => {
    const user = await prisma.user.findUnique({
      where: {
        id: +args.id,
      },
    });
    return user;
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
    //dev
  },

  updateUser: async (_parent: any, args: updateUser, _context: any) => {
    await prisma.user.update({
      where: {
        id: +args.id,
      },
      data: {
        email: args.data.email,
        name: args.data.name,
        lastName: args.data.lastName,
      },
    });
    const profileUpdated = await prisma.user.findUnique({
      where: {
        id: +args.id,
      },
    });

    return profileUpdated;
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
