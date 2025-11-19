import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProducts() {
  console.log('🔍 Checking products in database...\n');
  
  try {
    const products = await prisma.product.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        stock: true,
        published: true,
      }
    });
    
    console.log(`📦 Found ${products.length} products:\n`);
    
    if (products.length === 0) {
      console.log('⚠️  No products found in database!');
      console.log('\n💡 Solution: Run the seed command to add products:');
      console.log('   npm run db:seed\n');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name}`);
        console.log(`   ID: ${product.id}`);
        console.log(`   Slug: ${product.slug}`);
        console.log(`   Price: R${product.price}`);
        console.log(`   Stock: ${product.stock}`);
        console.log(`   Published: ${product.published ? '✅' : '❌'}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts();
