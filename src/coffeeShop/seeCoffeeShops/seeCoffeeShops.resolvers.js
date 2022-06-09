import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { page }) => {
      if (page) {
        return await client.coffeeShop.findMany({
          take: 5,
          skip: (page - 1) * 5,
        });
      } else {
        return await client.coffeeShop.findMany();
      }
    },
  },
};
