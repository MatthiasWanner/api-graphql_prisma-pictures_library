import prisma from "../../lib/prisma";

async function updateAlbum() {
  const post = await prisma.album.update({
    where: { id: 1 },
    data: { published: true },
  });
  console.log(post);
}
