import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String
    following: [User]
    followers: [User]
    CoffeeShop: [CoffeeShop]
    totalFollowing: Int!
    totalFollowers: Int!
  }
`;
