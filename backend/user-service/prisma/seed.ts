import { PrismaClient, ROLE } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@admin.hu' },
    update: {},
    create: {
      email: 'admin@admin.hu',
      name: 'Admin',
      password: 'admin',
      role: ROLE.ADMIN,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
