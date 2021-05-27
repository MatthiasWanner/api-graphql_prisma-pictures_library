import { Category } from ".prisma/client";
import prisma from "../../lib/prisma";
import { categoryMutations } from "./categories";

type Args = { id: string };
type CategoryId = string;

type CreateAlbum = {
  data: {
    title: string;
    authorId: string;
    content: string;
  };
};

type updateAlbum = {
  id: string;
  data: {
    title: string;
    content: string;
  };
};

export const albumQueries = {
  albums: async () => {
    return await prisma.album.findMany();
  },

  album: async (_parent: any, args: Args, _context: any) => {
    return await prisma.album.findUnique({
      where: {
        id: +args.id,
      },
    });
  },
};

export const albumMutations = {
  createAlbum: async (_parent: any, args: CreateAlbum, _context: any) => {
    try {
      return await prisma.album.create({
        data: {
          title: args.data.title,
          authorId: +args.data.authorId,
          content: args.data.content,
        },
      });
    } catch (e) {
      console.error(e);
      return { message: "erreur", error: e.stack };
    }
  },

  updateAlbum: async (_parent: any, args: updateAlbum, _context: any) => {
    //  const promises = []
    //   Promise.allSettled(promises)
    return await prisma.album.update({
      where: {
        id: +args.id,
      },
      data: {
        title: args.data.title,
        content: args.data.content,
      },
    });
  },

  deleteAlbum: async (_parent: any, args: Args, _context: any) => {
    return await prisma.album.delete({
      where: {
        id: +args.id,
      },
    });
  },
};
