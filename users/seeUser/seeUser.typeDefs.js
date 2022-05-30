import { gql } from "apollo-server";

export default gql`
  type seeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    totalPages: Int
  }
  type seeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowing(username: String!, page: Int!): seeFollowingResult
    seeFollowers(username: String!, page: Int!): seeFollowersResult
  }
`;
