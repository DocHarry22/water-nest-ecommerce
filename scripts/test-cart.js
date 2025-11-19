import http from 'http';

console.log('🧪 Testing Cart API...\n');

// Test 1: Try to add product to cart (guest - should fail with 401)
console.log('Test 1: Guest add to cart (expect 401)');
const postData = JSON.stringify({
  productId: "1",
  quantity: 1
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/cart',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${data}\n`);
    
    if (res.statusCode === 401) {
      console.log('✅ Cart correctly requires authentication');
      console.log('\n💡 For guest cart, the frontend uses localStorage');
      console.log('💡 Try adding items while NOT logged in - it should work with localStorage');
      console.log('💡 Try adding items while logged in - it should save to database');
    } else {
      console.log('⚠️  Unexpected response');
    }
  });
});

req.on('error', (error) => {
  console.error(`❌ Error: ${error.message}`);
  console.log('\n💡 Make sure your dev server is running: npm run dev');
});

req.write(postData);
req.end();
