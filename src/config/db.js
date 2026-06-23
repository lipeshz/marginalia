const dotenv = require('dotenv')
const pg = require('pg')
const { PrismaPg } = require('@prisma/adapter-pg')
const { PrismaClient } = require('@prisma/client')

dotenv.config()

const prismaClientSingleton = () => {
  const pool = new pg.Pool({ connectionString: process.env.DB_URL })
  const adapter = new PrismaPg(pool)

  return new PrismaClient({ adapter: adapter })
};

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}

module.exports = { prisma }