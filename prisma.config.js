const dotenv = require("dotenv")
dotenv.config()

const { defineConfig, env } = require("prisma/config")

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations"
  },
  datasource: {
    url: process.env.DB_URL
  },
})