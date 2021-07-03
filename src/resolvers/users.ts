import prisma from '../../lib/prisma';
import { CreateUser, updateUser } from './interfaces';

export const userQueries = {
  AllUsers: () => {
    return prisma.user.findMany();
  },

  OneUser: (_parent: any, args: { id: string }, _context: any) => {
    return prisma.user.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const userMutations = {
  createUser: async (_parent: any, args: CreateUser, _context: any) => {
    const user = await prisma.user.create({
      data: {
        userName: args.data.userName,
        email: args.data.email,
        password: args.data.password,
      },
    });

    return user;
  },

  updateUser: async (_parent: any, args: updateUser, _context: any) => {
    return await prisma.user.update({
      where: {
        id: +args.id,
      },
      data: {
        email: args.data.email,
        firstName: args.data.firstName,
        lastName: args.data.lastName,
        userName: args.data.userName,
        bio: args.data.bio,
        avatarUrl: args.data.avatarUrl,
        password: args.data.password,
      },
    });
  },

  deleteUser: async (_parent: any, args: { id: string }, _context: any) => {
    await prisma.user.delete({
      where: {
        id: +args.id,
      },
    });

    return { message: 'User Deleted' };
  },
};
