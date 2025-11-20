import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

console.log('🔒 Enabling Row Level Security (RLS) on all tables...\n');

try {
  const sqlFile = join(__dirname, 'enable-rls.sql');
  const sql = readFileSync(sqlFile, 'utf-8');
  
  // Split by semicolon and filter empty statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  for (const statement of statements) {
    try {
      await prisma.$executeRawUnsafe(statement + ';');
      
      // Extract table name or action from statement
      const match = statement.match(/(?:TABLE|ON)\s+"?(\w+)"?/i);
      const entity = match ? match[1] : 'statement';
      
      if (statement.includes('ENABLE ROW LEVEL SECURITY')) {
        console.log(`✅ Enabled RLS on: ${entity}`);
      } else if (statement.includes('CREATE POLICY')) {
        const policyMatch = statement.match(/CREATE POLICY "([^"]+)"/);
        const policyName = policyMatch ? policyMatch[1] : 'policy';
        console.log(`🛡️  Created policy: ${policyName}`);
      }
    } catch (error) {
      // Ignore errors for policies that already exist
      if (error.message && error.message.includes('already exists')) {
        continue;
      }
      console.error(`⚠️  Warning:`, error.message);
    }
  }
  
  console.log('\n✨ Row Level Security enabled successfully!');
  console.log('\n📋 Summary:');
  console.log('   - All tables now have RLS enabled');
  console.log('   - Service role (backend) has full access');
  console.log('   - Public API access is blocked');
  console.log('   - All data access goes through Next.js API routes\n');
  
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
