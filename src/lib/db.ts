import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  // Prisma 7 requires adapter configuration at runtime; the generated
  // constructor demands options, so keep the original zero-arg call
  return new (PrismaClient as unknown as new () => PrismaClient)()
}

// Instantiate lazily to avoid build-time instantiation errors
export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = createPrismaClient()
    }
    return Reflect.get(globalForPrisma.prisma, prop)
  },
})
