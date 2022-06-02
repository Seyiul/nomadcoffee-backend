import client from "../../client";

export default {
  Query: {
    seeCategories: async (_, { page }) => {
      return await client.category.findMany({
        take: 3,
        skip: (page - 1) * 3,
      });
    },
  },
};
