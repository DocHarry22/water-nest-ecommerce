import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    console.log('🔍 Checking for users in database...\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
      take: 10,
    });

    if (users.length === 0) {
      console.log('❌ No users found in database!\n');
      console.log('You need to create a user account first.');
      console.log('Visit: http://localhost:3000/auth/register');
    } else {
      console.log(`✅ Found ${users.length} user(s):\n`);
      users.forEach(user => {
        console.log(`📧 Email: ${user.email}`);
        console.log(`👤 Name: ${user.name || 'Not set'}`);
        console.log(`🔑 Role: ${user.role}`);
        console.log(`🔒 Has password: ${user.password ? 'Yes' : 'No (OAuth only)'}`);
        console.log('---');
      });
    }
  } catch (error) {
    console.error('❌ Error checking users:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
