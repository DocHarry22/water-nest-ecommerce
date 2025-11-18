const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function wakeDatabase() {
  console.log('🔄 Attempting to wake database...\n');
  
  const maxRetries = 3;
  let attempt = 0;
  
  while (attempt < maxRetries) {
    attempt++;
    const startTime = Date.now();
    
    try {
      console.log(`📡 Attempt ${attempt}/${maxRetries}...`);
      
      await prisma.$connect();
      await prisma.$queryRaw`SELECT 1`;
      
      const responseTime = Date.now() - startTime;
      console.log(`✅ Database is ACTIVE! (${responseTime}ms)`);
      
      if (responseTime > 2000) {
        console.log('💤 Database was sleeping - now awake!');
      }
      
      await prisma.$disconnect();
      return true;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.log(`❌ Attempt ${attempt} failed after ${responseTime}ms`);
      
      if (attempt < maxRetries) {
        console.log('⏳ Waiting 3 seconds before retry...\n');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
  
  console.log('\n❌ Failed to wake database after all attempts');
  console.log('\n💡 Possible solutions:');
  console.log('   1. Check Neon Console: https://console.neon.tech');
  console.log('   2. Verify DATABASE_URL in .env');
  console.log('   3. Database might be paused (upgrade to Pro for always-on)');
  console.log('   4. Check Neon status: https://neonstatus.com');
  
  await prisma.$disconnect();
  return false;
}

wakeDatabase().then(success => {
  process.exit(success ? 0 : 1);
});
