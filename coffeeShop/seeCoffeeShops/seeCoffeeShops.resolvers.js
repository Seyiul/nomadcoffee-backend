import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      return await client.coffeeShop.findMany({
        take: 3,
        skip: (page - 1) * 3,
      });
    },
  },
};
