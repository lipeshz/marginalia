const dotenv = require("dotenv")
dotenv.config()

const { defineConfig } = require("prisma/config")

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/"
  },
  datasource: {
    url: process.env.DB_URL,
  },
})