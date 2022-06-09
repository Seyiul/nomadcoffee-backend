import client from "../client";
export default {
  CoffeeShop: {
    user: ({ userId }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    photos: ({ id }) => {
      return client.coffeeShopPhoto.findMany({
        where: {
          shop: {
            id,
          },
        },
      });
    },
    categories: ({ id }) => {
      return client.category.findMany({
        where: {
          shops: {
            some: {
              id,
            },
          },
        },
      });
    },
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
