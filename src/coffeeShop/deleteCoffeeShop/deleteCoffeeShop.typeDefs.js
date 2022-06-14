import { gql } from "apollo-server";

export default gql`
  type deleteCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteCoffeeShop(id: Int!): deleteCoffeeShopResult!
  }
`;
