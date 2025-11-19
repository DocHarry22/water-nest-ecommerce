import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const indexes = [
  // Cart and CartItem indexes
  'CREATE INDEX IF NOT EXISTS "Cart_userId_idx" ON "Cart"("userId")',
  'CREATE INDEX IF NOT EXISTS "CartItem_cartId_idx" ON "CartItem"("cartId")',
  'CREATE INDEX IF NOT EXISTS "CartItem_productId_idx" ON "CartItem"("productId")',
  
  // Product indexes
  'CREATE INDEX IF NOT EXISTS "Product_slug_idx" ON "Product"("slug")',
  'CREATE INDEX IF NOT EXISTS "Product_categoryId_idx" ON "Product"("categoryId")',
  'CREATE INDEX IF NOT EXISTS "Product_published_idx" ON "Product"("published")',
  'CREATE INDEX IF NOT EXISTS "Product_featured_idx" ON "Product"("featured")',
  'CREATE INDEX IF NOT EXISTS "Product_createdAt_idx" ON "Product"("createdAt" DESC)',
  
  // Order indexes
  'CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId")',
  'CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status")',
  'CREATE INDEX IF NOT EXISTS "Order_createdAt_idx" ON "Order"("createdAt" DESC)',
  'CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId")',
  
  // User indexes
  'CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"("email")',
  'CREATE INDEX IF NOT EXISTS "User_role_idx" ON "User"("role")',
  
  // Session indexes
  'CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId")',
  'CREATE INDEX IF NOT EXISTS "Session_sessionToken_idx" ON "Session"("sessionToken")',
  
  // Account indexes
  'CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId")',
  
  // Review indexes
  'CREATE INDEX IF NOT EXISTS "Review_productId_idx" ON "Review"("productId")',
  'CREATE INDEX IF NOT EXISTS "Review_userId_idx" ON "Review"("userId")',
  'CREATE INDEX IF NOT EXISTS "Review_approved_idx" ON "Review"("approved")',
];

console.log('📊 Adding database indexes for performance...\n');

for (const indexSql of indexes) {
  try {
    await prisma.$executeRawUnsafe(indexSql);
    const indexName = indexSql.match(/"([^"]+)"/)?.[1];
    console.log(`✅ Created index: ${indexName}`);
  } catch {
    const indexName = indexSql.match(/"([^"]+)"/)?.[1];
    console.log(`⚠️  Index ${indexName} may already exist`);
  }
}

console.log('\n✨ Database indexes optimized!');
await prisma.$disconnect();
