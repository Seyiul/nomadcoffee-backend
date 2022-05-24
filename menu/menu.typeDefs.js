import { gql } from "apollo-server";

export default gql`
  type Coffee {
    id: Int!
    name: String!
    price: Int!
  }
  type Query {
    coffees: [Coffee]
    coffee(id: Int!): Coffee
  }
  type Mutation {
    createCoffee(name: String!, price: Int!): Coffee
  }
`;
