import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync } from "fs";
import path from "path";

const isVercel = process.env.VERCEL === "1";
const databaseUrl = process.env.DATABASE_URL;

if (isVercel && (!databaseUrl || databaseUrl.startsWith("file:"))) {
  const runtimePath = "/tmp/person-app.db";
  const templatePath = path.join(process.cwd(), "dev.db");

  if (!existsSync(runtimePath) && existsSync(templatePath)) {
    copyFileSync(templatePath, runtimePath);
  }

  process.env.DATABASE_URL = `file:${runtimePath}`;
}

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
