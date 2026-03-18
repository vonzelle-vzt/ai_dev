/* eslint-disable @typescript-eslint/no-explicit-any */

const globalForPrisma = globalThis as unknown as { prisma: any }

function createPrismaClient() {
  // Lazy import to avoid build-time instantiation errors
  // Prisma 7 requires adapter configuration at runtime
  const { PrismaClient } = require("@/generated/prisma/client")
  return new PrismaClient()
}

export const db: any = new Proxy({} as any, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    return globalForPrisma.prisma[prop]
  },
})
