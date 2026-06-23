const UserService = require('../services/user.service')

const UserController = {
    async store(req, res, next){
        try{
            console.log('ofnslknfgs')
            const { name, email, password, conf_password } = req.body
            const result = await userService.store({ name, email, password, conf_password })

            return res.status(200).json(result)
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController