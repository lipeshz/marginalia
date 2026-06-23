const { Router } = require('express')
const userRoutes = require('./user.routes')

const rootRouter = Router()

rootRouter.use('/', userRoutes)

module.exports = rootRouter