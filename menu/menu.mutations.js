import client from "../client";
export default {
  Mutation: {
    createCoffee: (_, { name, price }) =>
      client.coffee.create({
        data: {
          name,
          price,
        },
      }),
  },
};
