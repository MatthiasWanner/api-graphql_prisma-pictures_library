import prisma from "../../lib/prisma";

type queryArgs = { userId: string };
type deleteArgs = { id: string };

type CreateCategory = {
  userId: string;
  name: string;
};

type updateCategory = { id: string; name: string };

export const categoryQueries = {
  categories: (_parent: any, args: queryArgs, _context: any) => {
    return prisma.category.findMany({
      where: {
        userId: +args.userId,
      },
    });
  },

  userCategories: (_parent: any, args: queryArgs, _context: any) => {
    return prisma.category.findMany({
      where: {
        userId: +args.userId,
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

  updateCategory: async (_parent: any, args: updateCategory, _context: any) => {
    return await prisma.category.update({
      where: {
        id: +args.id,
      },
      data: {
        name: args.name,
      },
    });
  },

  deleteCategory: async (_parent: any, args: deleteArgs, _context: any) => {
    return await prisma.category.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
