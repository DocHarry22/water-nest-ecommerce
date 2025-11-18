const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDatabase() {
  const startTime = Date.now();
  
  try {
    console.log('🔍 Checking database connection...\n');
    
    // Try to connect
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Run a simple query
    const result = await prisma.$queryRaw`SELECT 1 as status, NOW() as timestamp`;
    const connectTime = Date.now() - startTime;
    
    console.log('\n📊 Database Status:');
    console.log('   Status: ACTIVE ✅');
    console.log(`   Response time: ${connectTime}ms`);
    console.log(`   Timestamp: ${result[0].timestamp}`);
    
    if (connectTime > 1000) {
      console.log('\n⚠️  Warning: Slow response time detected!');
      console.log('   Database may have been paused (cold start)');
    } else {
      console.log('\n🚀 Database is warm and responsive!');
    }
    
  } catch (error) {
    const connectTime = Date.now() - startTime;
    console.log('❌ Database connection failed!\n');
    console.log('📊 Error Details:');
    console.log(`   Time elapsed: ${connectTime}ms`);
    console.log(`   Error code: ${error.code || 'N/A'}`);
    console.log(`   Message: ${error.message}`);
    
    if (error.code === 'P1001') {
      console.log('\n💡 Possible causes:');
      console.log('   • Database is paused (Neon auto-suspend)');
      console.log('   • Database server is down');
      console.log('   • Network connectivity issues');
      console.log('   • Invalid connection credentials');
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
