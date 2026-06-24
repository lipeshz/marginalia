const userRepository = require('../repositories/user.repository')
const UserService = require('../services/user.service')
const responseErrorController = require('../utils/response.error')

const userService = new UserService(userRepository)

const UserController = {
    async store(req, res, next){
        try{
            const { name, email, password, conf_password } = req.body
            const result = await userService.store({ name, email, password, conf_password })

            if(!result.success) return responseErrorController(res, result)
            return res.status(200).json(result)
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController