import client from "../client";
export default {
  User: {
    CoffeeShop: ({ id }) => {
      client.coffeeShop.findMany({
        where: {
          user: {
            id,
          },
        },
      });
    },
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
