import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// 1. Setup the connection pool (Standard pg way)
const connectionString = `${process.env.DATABASE_URL}`;

// 2. Define the global type so TypeScript doesn't complain
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

// 3. The Logic: Reuse or Create
export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  })();

// 4. Save the global in development
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
