import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

console.log('🔍 Testing database and products...\n');

try {
  // Test connection
  console.log('1. Testing connection...');
  await prisma.$connect();
  console.log('✅ Connected to database\n');

  // Count products
  console.log('2. Checking products...');
  const productCount = await prisma.product.count();
  console.log(`✅ Found ${productCount} products\n`);

  // Get first 3 products
  if (productCount > 0) {
    console.log('3. Sample products:');
    const products = await prisma.product.findMany({
      take: 3,
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
      }
    });
    products.forEach(p => {
      console.log(`   - ${p.name} (R${p.price}) - Stock: ${p.stock} - ID: ${p.id}`);
    });
  }

  console.log('\n✅ Database is working correctly!');
} catch (error) {
  console.error('❌ Error:', error.message);
} finally {
  await prisma.$disconnect();
}
