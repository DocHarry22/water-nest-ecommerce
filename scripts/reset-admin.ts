import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL || process.env.DATABASE_URL,
    },
  },
});

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@waternest.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@waternest.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Admin user created/updated:', admin.email);
  console.log('Email: admin@waternest.com');
  console.log('Password: admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
