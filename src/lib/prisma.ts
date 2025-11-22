import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Only create Prisma client if DATABASE_URL is available
// This allows builds to succeed even without database access
export const prisma: PrismaClient | undefined = process.env.DATABASE_URL
  ? (globalForPrisma.prisma ??
    new PrismaClient({
      log: ['error'],
      // Connection pool settings for better performance
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    }))
  : undefined;

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}

// Export a default for convenience
export default prisma;
