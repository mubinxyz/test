import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // write prisma client queryies here

  const user = await prisma.user.findMany({
    where: {
      email: { endsWith: "@gmail.com" },
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
