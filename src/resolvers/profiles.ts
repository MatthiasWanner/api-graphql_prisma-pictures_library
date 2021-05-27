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
  profile: (_parent: any, args: Args, _context: any) => {
    return prisma.user
      .findUnique({
        where: {
          id: +args.userId,
        },
      })
      .profile();
  },
};

export const profileMutations = {
  updateProfile: async (_parent: any, args: updateProfile, _context: any) => {
    return prisma.profile.update({
      where: {
        userId: +args.userId,
      },
      data: {
        bio: args.data.bio,
        profileImg: args.data.profileImg,
      },
    });
  },
};
