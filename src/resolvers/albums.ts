import prisma from "../../lib/prisma";

type Args = { id: string };
type CategoryId = string;
type PictureId = string;
type CreateAlbum = {
  data: {
    title: string;
    authorId: string;
  };
};

type updateAlbum = {
  id: string;
  data: {
    title: string;
    content: PictureId[];
    categories: CategoryId[];
  };
};

export const albumQueries = {
  albums: async () => {
    const allAlbums = await prisma.album.findMany();
    return allAlbums;
  },

  album: async (_parent: any, args: Args, _context: any) => {
    const album = await prisma.album.findUnique({
      where: {
        id: +args.id,
      },
    });
    return album;
  },
};

export const albumMutations = {
  createAlbum: async (_parent: any, args: CreateAlbum, _context: any) => {
    await prisma.album.create({
      data: {
        title: args.data.title,
        authorId: +args.data.authorId,
      },
    });

    return { title: args.data.title, authorId: +args.data.authorId };
  },

  // updateAlbum: async (_parent: any, args: updateAlbum, _context: any) => {
  //   const pictures: [] = [];
  //   args.data.content.forEach(async (pictureId) => {
  //     const picture = await prisma.picture.findUnique({
  //       where: {
  //         id: +pictureId,
  //       }
  //     })
  //     pictures.push(picture);
  //   })

  //   await prisma.album.update({
  //     where: {
  //       id: +args.id,
  //     },
  //     data: {
  //       title: args.data.title,
  //       content: pictures,
  //       categories: args.data.categories,
  //     },
  //   });
  //   const albumUpdated = await prisma.album.findUnique({
  //     where: {
  //       id: +args.id,
  //     },
  //   });

  //   return albumUpdated;
  // },

  // deleteAlbum: async (_parent: any, args: Args, _context: any) => {
  //   const albumDeleted = await prisma.album.findUnique({
  //     where: {
  //       id: +args.id,
  //     },
  //   });

  //   await prisma.album.delete({
  //     where: {
  //       id: +args.id,
  //     },
  //   });

  //   return albumDeleted;
  // },
};
