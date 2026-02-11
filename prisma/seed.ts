import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
const prisma = new PrismaClient();

async function main() {
  await prisma.tool.createMany({
    data: [
      {
        name: 'Example Tool 1',
        description: 'This is an example tool description',
        url: ['https://example.com'],
        date: new Date(),
      },
      {
        name: 'Example Tool 2',
        description: 'Another example tool',
        url: ['https://example2.com', 'https://example2-alt.com'],
        date: new Date(),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });