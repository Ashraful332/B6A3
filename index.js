const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // CREATE
  const user = await prisma.user.create({
    data: {
      name: "Ashraful",
      email: "ashraful@email.com",
    },
  });

  console.log("Created User:", user);

  // READ
  const users = await prisma.user.findMany();
  console.log("All Users:", users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });