const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const prisma = require('./config/db')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

async function startServer(){
    const users = await prisma.users.findMany()
    console.log(users)
}

startServer();