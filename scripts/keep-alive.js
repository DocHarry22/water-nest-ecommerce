import https from 'https';
import http from 'http';

const PING_INTERVAL = 4 * 60 * 1000; // 4 minutes
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const KEEP_ALIVE_ENDPOINT = `${APP_URL}/api/keep-alive`;

let pingCount = 0;
let successCount = 0;
let failCount = 0;

function ping() {
  pingCount++;
  const startTime = Date.now();
  
  const lib = APP_URL.startsWith('https') ? https : http;
  
  console.log(`\n🔄 Ping #${pingCount} - ${new Date().toLocaleTimeString()}`);
  console.log(`📡 Pinging: ${KEEP_ALIVE_ENDPOINT}`);
  
  const req = lib.get(KEEP_ALIVE_ENDPOINT, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const duration = Date.now() - startTime;
      
      if (res.statusCode === 200) {
        successCount++;
        console.log(`✅ Success (${duration}ms)`);
        
        try {
          const response = JSON.parse(data);
          console.log(`📊 Status: ${response.status}`);
          if (response.database) {
            console.log(`🗄️  Database: Online`);
          }
        } catch {
          console.log(`📄 Response received`);
        }
      } else {
        failCount++;
        console.log(`❌ Failed (${res.statusCode}) - ${duration}ms`);
      }
      
      console.log(`📈 Stats: ${successCount} success, ${failCount} failed`);
      console.log(`⏰ Next ping in 4 minutes...`);
    });
  });
  
  req.on('error', (error) => {
    failCount++;
    const duration = Date.now() - startTime;
    console.log(`❌ Error (${duration}ms): ${error.message}`);
    console.log(`💡 Make sure your app is running at ${APP_URL}`);
    console.log(`📈 Stats: ${successCount} success, ${failCount} failed`);
    console.log(`⏰ Next ping in 4 minutes...`);
  });
  
  req.setTimeout(10000, () => {
    req.destroy();
    console.log('⏱️  Request timeout');
  });
}

console.log('🚀 Neon Keep-Alive Service Started');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📍 Target: ${KEEP_ALIVE_ENDPOINT}`);
console.log(`⏱️  Interval: Every 4 minutes`);
console.log(`🎯 Purpose: Prevent Neon database auto-pause`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('💡 Tip: Keep this running while developing');
console.log('Press Ctrl+C to stop\n');

// Initial ping
ping();

// Set up interval
setInterval(ping, PING_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down keep-alive service...');
  console.log(`📊 Final stats: ${successCount} success, ${failCount} failed out of ${pingCount} total`);
  console.log('👋 Goodbye!\n');
  process.exit(0);
});
