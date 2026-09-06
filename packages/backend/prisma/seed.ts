# Prisma Seed Script
# Initializes database with essential records (roles, permissions)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create roles
  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'System administrator with full access',
    },
  });

  await prisma.role.upsert({
    where: { name: 'Treasurer' },
    update: {},
    create: {
      name: 'Treasurer',
      description: 'Records financial transactions',
    },
  });

  await prisma.role.upsert({
    where: { name: 'Committee' },
    update: {},
    create: {
      name: 'Committee',
      description: 'Reviews and approves actions',
    },
  });

  await prisma.role.upsert({
    where: { name: 'Member' },
    update: {},
    create: {
      name: 'Member',
      description: 'Regular group member',
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
