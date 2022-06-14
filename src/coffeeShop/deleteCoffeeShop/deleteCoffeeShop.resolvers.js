import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteCoffeeShop: protectResolver(async (_, { id }, { loggedInUser }) => {
      const coffeeshop = await client.coffeeShop.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!coffeeshop) {
        return {
          ok: false,
          error: "coffeeShop not found",
        };
      } else if (coffeeshop.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
      } else {
        await client.coffeeShop.delete({
          where: {
            id,
          },
        });
        return {
          ok: true,
        };
      }
    }),
  },
};
