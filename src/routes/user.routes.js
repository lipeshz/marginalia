const { Router } = require('express')
const UserController = require('../controllers/user.controller')
const authMiddleWare = require('../middlewares/auth.middleware')

const userRoutes = Router()

userRoutes.post('/users', UserController.store)
userRoutes.get('/users', authMiddleWare, UserController.index)
userRoutes.post('/users/login', UserController.login)

module.exports = userRoutes