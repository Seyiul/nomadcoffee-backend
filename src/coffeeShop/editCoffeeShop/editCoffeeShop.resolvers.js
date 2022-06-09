import { createWriteStream } from "fs";
import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, latitude, longitude, file, categories },
        { loggedInUser }
      ) => {
        const oldShop = await client.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            categories: true,
          },
        });
        if (!oldShop) {
          throw new Error("Shop not Found");
        }

        let newfileUrl = null;
        if (file) {
          const { filename, createReadStream } = await file;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/src/uploads/${newFilename}`
          );

          readStream.pipe(writeStream);
          newfileUrl = `http://localhost:4000/static/${newFilename}`;
        }

        return await client.coffeeShop.update({
          where: {
            id,
          },
          data: {
            ...(name && { name }),
            ...(latitude && { latitude }),
            ...(longitude && { longitude }),
            ...(newfileUrl && {
              photos: {
                create: {
                  url: newfileUrl,
                },
              },
            }),
            ...(categories && {
              categories: {
                disconnect: oldShop.categories,
                connectOrCreate: processCategories(categories),
              },
            }),
          },
        });
      }
    ),
  },
};
