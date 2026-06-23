const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { prisma } = require('./config/db')
const mainRoutes = require('./routes/index.routes')

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(mainRoutes)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})