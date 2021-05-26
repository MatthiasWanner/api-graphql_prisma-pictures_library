import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: ID!
    userName: String!
    name: String
    lastName: String
    email: String
    role: Role
    profile: Profile
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

  type Profile {
    id: ID!
    bio: String
    profileImg: String
    user: User
    userId: Int!
  }

  type Album {
    id: ID!
    title: String!
    createdAt: String
    content: [Picture]
    published: Boolean
    author: User
    authorId: Int!
    categories: [Category]
  }

  type Picture {
    id: ID!
    title: String!
    url: String!
    description: String
    albums: [Album]
    owner: User
    ownerId: Int!
  }

  type Category {
    id: ID!
    name: String!
    albums: [Album]
    user: User
    userId: Int!
  }

  input userCreateInput {
    userName: String!
    email: String
    name: String
    lastName: String
  }

  input updateUserInput {
    email: String
    name: String
    lastName: String
  }

  input profileInput {
    bio: String
    profileImg: String
  }

  input createPictureInput {
    title: String!
    url: String!
    description: String
    ownerId: String!
  }

  input updatePictureInput {
    title: String!
    url: String!
    description: String
  }

  input albumCreateInput {
    authorId: String!
    title: String!
  }

  input albumUpdateInput {
    title: String
    content: [String]
    categories: [String]
  }

  type Query {
    users: [User]
    user(id: ID): User
    profile(userId: ID): Profile
    pictures(picturesId: [Int]): [Picture]
    picture(id: ID): Picture
    categories: [Category]
    userCategories(userId: String!): [Category]
    albums: [Album]
    album(id: ID): Album
  }

  type Mutation {
    createUser(data: userCreateInput): User
    updateUser(id: ID, data: updateUserInput): User
    deleteUser(id: ID): User
    updateProfile(userId: ID, data: profileInput): Profile
    createPicture(data: createPictureInput): Picture
    updatePicture(id: ID, data: updatePictureInput): Picture
    deletePicture(id: ID): Picture
    createCategory(userId: String!, name: String!): Category
    updateCategory(id: String!, name: String): Category
    deleteCategory(id: ID!): Category
    createAlbum(authorId: Int, data: albumCreateInput): Album
    updateAlbum(id: ID, data: albumUpdateInput): Album
  }
`;
