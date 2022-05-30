import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    unfollowUser: protectResolver(async (_, { username }, { LoggedInUser }) => {
      const ok = await client.user.findUnique({
        where: { username },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Can't follow user",
        };
      }
      await client.user.update({
        where: {
          id: LoggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
