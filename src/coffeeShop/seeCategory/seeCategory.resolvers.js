import client from "../../client";

export default {
  Query: {
    seeCategory: async (_, { category, page }) => {
      const hashtagName = `#${category}`;
      return await client.category
        .findUnique({
          where: {
            name: hashtagName,
          },
        })
        .shops({ take: 3, skip: (page - 1) * 3 });
    },
  },
};
