/**
 * Create the prisma client
 */

import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting the database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// define the actual prisma instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
    ],
  });

// attach the prisma client to `global` in
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
