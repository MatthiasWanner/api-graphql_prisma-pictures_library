import prisma from "../../lib/prisma";

type Args = { userId: string };
type updateProfile = {
  userId: string;
  data: {
    bio: string;
    profileImg: string;
  };
};

export const profileQueries = {
  profile: async (_parent: any, args: Args, _context: any) => {
    const profile = await prisma.profile.findUnique({
      where: {
        userId: +args.userId,
      },
    });
    return profile;
  },
};

export const profileMutations = {
  updateProfile: async (_parent: any, args: updateProfile, _context: any) => {
    await prisma.profile.update({
      where: {
        userId: +args.userId,
      },
      data: {
        bio: args.data.bio,
        profileImg: args.data.profileImg,
      },
    });
    const profileCreated = await prisma.profile.findUnique({
      where: {
        userId: +args.userId,
      },
    });

    return profileCreated;
  },
};
