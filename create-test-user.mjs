import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestUsers() {
  try {
    console.log('🔍 Creating test users...\n');

    // Test credentials
    const testUsers = [
      {
        email: 'admin@waternest.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'ADMIN',
      },
      {
        email: 'staff@waternest.com',
        password: 'staff123',
        name: 'Staff User',
        role: 'STAFF',
      },
      {
        email: 'customer@waternest.com',
        password: 'customer123',
        name: 'Test Customer',
        role: 'CUSTOMER',
      },
    ];

    for (const userData of testUsers) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const hashedPassword = await hash(userData.password, 12);

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          emailVerified: new Date(), // Mark as verified
        },
      });

      console.log(`✅ Created ${userData.role} user:`);
      console.log(`   📧 Email: ${userData.email}`);
      console.log(`   🔑 Password: ${userData.password}`);
      console.log(`   👤 Name: ${userData.name}\n`);
    }

    console.log('\n🎉 Test users created successfully!');
    console.log('\n📝 Login credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:    admin@waternest.com / admin123');
    console.log('Staff:    staff@waternest.com / staff123');
    console.log('Customer: customer@waternest.com / customer123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error creating users:', error.message);
    if (error.code === 'P2002') {
      console.log('\n💡 Users already exist. Try logging in with:');
      console.log('   admin@waternest.com / admin123');
    }
  } finally {
    await prisma.$disconnect();
  }
}

createTestUsers();
