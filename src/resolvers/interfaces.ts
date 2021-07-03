export interface CreateUser {
  data: {
    userName: string;
    email: string;
    password?: string;
    isOAuth: boolean;
  };
}

export interface updateUser {
  id: string;
  data: {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    avatarUrl: string;
  };
}

export interface CreateAlbum {
  data: {
    title: string;
    authorId: string;
    description: string;
  };
}

export interface UpdateAlbum {
  id: string;
  data: {
    title: string;
    description: string;
    published: boolean;
    pictures: string[];
    categories: string[];
  };
}

export type CreateCategory = {
  userId: string;
  name: string;
};

export type UpdateCategory = { id: string; name: string };

export interface CreatePicture {
  data: {
    title: string;
    url: string;
    description: string;
    ownerId: string;
  };
}

export interface UpdatePicture {
  id: string;
  data: {
    title: string;
    url: string;
    description: string;
  };
}
