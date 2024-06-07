import dbclient from "../src/prismaClient";
import {
  admin,
  users,
  mockNotes,
  mockTasks,
  mockCategories,
} from "./seed.data";

async function seed() {
  await dbclient.user.create({
    data: { ...admin },
  });

  for (const user of users) {
    await dbclient.user.create({
      data: { ...user },
    });
  }

  const user = await dbclient.user.findFirstOrThrow({ where: { name: "Ron" } });

  for (const category of mockCategories) {
    await dbclient.user.update({
      where: { id: user.id },
      data: { categories: { create: category } },
    });
  }

  for (const task of mockTasks) {
    await dbclient.user.update({
      where: { id: user.id },
      data: { tasks: { create: task } },
    });
  }

  for (const note of mockNotes) {
    await dbclient.user.update({
      where: { id: user.id },
      data: { notes: { create: note } },
    });
  }
}

seed()
  .then(async () => {
    await dbclient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await dbclient.$disconnect();
    process.exit(1);
  });
