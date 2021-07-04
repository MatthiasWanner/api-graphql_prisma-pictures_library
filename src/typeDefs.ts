import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: ID!
    userName: String!
    firstName: String
    lastName: String
    avatarUrl: String
    bio: String
    email: String!
    role: Role
    createdAt: String
    updatedAt: String
    pictures: [Picture]
    albums: [Album]
    categories: [Category]
  }

  enum Role {
    USER
    ADMIN
  }

  type Album {
    id: ID!
    title: String!
    description: String
    pictures: [Picture]
    published: Boolean
    createdAt: String
    updatedAt: String
    author: User
    authorId: ID!
    categories: [Category]
  }

  type Picture {
    id: ID!
    title: String!
    url: String!
    description: String
    albums: [Album]
    owner: User
    ownerId: ID!
  }

  type Category {
    id: ID!
    name: String!
    albums: [Album]
    user: User
    userId: ID!
  }

  input userCreateInput {
    userName: String!
    email: String!
    password: String
  }

  input updateUserInput {
    userName: String
    email: String
    oldPassword: String
    newPassword: String
    firstName: String
    lastName: String
    bio: String
    avatarUrl: String
  }

  type UpdateUserResponse {
    message: String
    user: User
  }

  input createPictureInput {
    title: String!
    url: String!
    description: String
    ownerId: ID!
  }

  input updatePictureInput {
    title: String!
    url: String!
    description: String
  }

  input albumCreateInput {
    authorId: ID!
    title: String!
    description: String
  }

  input albumUpdateInput {
    title: String
    description: String
    published: Boolean
    pictures: [String]
    categories: [String]
  }

  type Query {
    AllUsers: [User]
    OneUser(id: ID!): User
    UserPictures(userId: ID!): [Picture]
    OnePicture(id: ID!): Picture
    UserCategories(userId: ID!): [Category]
    OneCategory(id: ID!): Category
    AllAlbums: [Album]
    AllUserAlbums(userId: ID!): [Album]
    OneAlbum(id: ID!): Album
  }

  type Mutation {
    createUser(data: userCreateInput!): User
    updateUser(id: ID!, data: updateUserInput!): UpdateUserResponse
    deleteUser(id: ID!): User
    createPicture(data: createPictureInput!): Picture
    updatePicture(id: ID!, data: updatePictureInput!): Picture
    deletePicture(id: ID!): Picture
    createCategory(userId: ID!, name: String!): Category
    updateCategory(id: ID!, name: String!): Category
    deleteCategory(id: ID!): Category
    createAlbum(data: albumCreateInput!): Album
    updateAlbum(id: ID!, data: albumUpdateInput!): Album
    deleteAlbum(id: ID!): Album
  }
`;
