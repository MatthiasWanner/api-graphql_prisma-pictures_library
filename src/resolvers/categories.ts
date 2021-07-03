import prisma from '../../lib/prisma';
import { CreateCategory, UpdateCategory } from './interfaces';

export const categoryQueries = {
  UserCategories: (_parent: any, args: { userId: string }, _context: any) => {
    return prisma.category.findMany({
      where: {
        userId: +args.userId,
      },
    });
  },

  OneCategory: (_parent: any, args: { id: string }, _context: any) => {
    return prisma.category.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const categoryMutations = {
  createCategory: async (_parent: any, args: CreateCategory, _context: any) => {
    return await prisma.category.create({
      data: {
        userId: +args.userId,
        name: args.name,
      },
    });
  },

  updateCategory: async (_parent: any, args: UpdateCategory, _context: any) => {
    return await prisma.category.update({
      where: {
        id: +args.id,
      },
      data: {
        name: args.name,
      },
    });
  },

  deleteCategory: async (_parent: any, args: { id: string }, _context: any) => {
    return await prisma.category.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
