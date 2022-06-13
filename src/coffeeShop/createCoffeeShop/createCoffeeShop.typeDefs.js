import { gql } from "apollo-server";

export default gql`
  type createCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      name: String!
      latitude: String!
      longitude: String!
      file: Upload
      categories: String
    ): createCoffeeShopResult!
  }
`;
