import { protectResolver } from "../../users/users.utils";
import client from "../../client";
import { createWriteStream } from "fs";
import { processCategories } from "../coffeeShop.utils";

export default {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { name, latitude, longitude, file, categories },
        { loggedInUser }
      ) => {
        let existingShop = await client.coffeeShop.findFirst({
          where: {
            name,
            longitude,
            latitude,
          },
        });
        if (existingShop) {
          return {
            ok: false,
            error: "Existing Shop",
          };
        }
        let fileUrl = null;
        if (file) {
          const { filename, createReadStream } = await file;
          const newFilename = `${Date.now()}-${filename}`;
          const readStream = createReadStream();
          const writeStream = createWriteStream(
            `${process.cwd()}/uploads/${newFilename}`
          );
          readStream.pipe(writeStream);
          fileUrl = `http://localhost:4000/static/${newFilename}`;
        }

        let categoryObj = [];
        if (categories) {
          categoryObj = processCategories(categories);
        }
        await client.coffeeShop.create({
          data: {
            name,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(latitude && { latitude }),
            ...(longitude && { longitude }),
            ...(fileUrl && {
              photos: {
                create: {
                  url: fileUrl,
                },
              },
            }),
            ...(categoryObj.length > 0 && {
              categories: { connectOrCreate: categoryObj },
            }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
