import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('👥 Users in database:\n');

const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    role: true,
    name: true,
  }
});

users.forEach(u => {
  console.log(`${u.role === 'ADMIN' ? '👑' : u.role === 'STAFF' ? '👔' : '👤'} ${u.name || u.email}`);
  console.log(`   Email: ${u.email}`);
  console.log(`   Role: ${u.role}`);
  console.log(`   ID: ${u.id}\n`);
});

console.log(`Total: ${users.length} users`);

await prisma.$disconnect();
