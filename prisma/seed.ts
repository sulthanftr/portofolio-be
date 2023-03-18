// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy experiences
  const post1 = await prisma.experience.upsert({
    where: { title: 'Backend Developer at PTI' },
    update: {},
    create: {
      title: 'Backend Developer at PTI',
      description:
        'Developed and maintained several web apps for BEM Fasilkom UI.',
      startedAt: new Date('2022-04-01T00:00:00.000Z'),
      endedAt: new Date('2023-01-01T00:00:00.000Z')
    },
  });

  const post2 = await prisma.experience.upsert({
    where: { title: 'Web Developer at BETIS 2023' },
    update: {},
    create: {
      title: 'Web Developer at BETIS 2023',
      description:
        'Developed an online learning platform for BETIS 2023 program.',
      startedAt: new Date('2022-04-01T00:00:00.000Z'),
      endedAt: new Date('2023-03-01T00:00:00.000Z')
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });