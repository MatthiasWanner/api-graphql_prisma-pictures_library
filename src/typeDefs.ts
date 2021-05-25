import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: ID
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

  input albumCreateInput {
    title: String!
    content: String
    categories: String
  }

  type Query {
    users: [User]
    user(id: ID): User
    albums: [Album]
    album(id: ID): Album
    categories: [Category]
    categorie(id: ID): Category
    profile(userId: ID): Profile
    pictures(picturesId: [Int]): [Picture]
  }

  type Mutation {
    createUser(data: userCreateInput): User
    updateUser(id: ID, data: updateUserInput): User
    deleteUser(id: ID): User
    updateProfile(userId: ID, data: profileInput): Profile
    createAlbum(authorId: Int, data: albumCreateInput): Album
    createCategory(userId: Int, name: String): Category
    postPicture(name: String): Picture
  }
`;
