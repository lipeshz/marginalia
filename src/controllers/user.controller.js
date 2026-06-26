const userRepository = require('../repositories/user.repository')
const UserService = require('../services/user.service')
const { userRegisterSchema, userLoginSchema }  = require('../utils/zod.user.schema')
const getStatusCode = require('../utils/http.response')

const userService = new UserService(userRepository)

const UserController = {
    async store(req, res, next){
        try{
            const validData = userRegisterSchema.safeParse(req.body)

            if(validData.error){
                const errors = validData.error.flatten().fieldErrors

                return res.status(422).json({ errors: errors })
            }

            const { name, email, password } = validData.data
            const result = await userService.store({ name, email, password })
            
            if(result.label){
                const statusCode = getStatusCode(result.label)

                return res.status(statusCode.statusCode).json({ errors: result.errors } )
            }

            return res.status(200).json(result)
        }catch(error){
            next(error)
        }
    },

    async index(req, res, next){
        try{
            const { name, email, role } = req.query
            const result = await userService.index({ name, email, role })

            if(result.errors){
                const statusCode = getStatusCode(result.label)

                return res.status(statusCode.statusCode).json({ errors: result.errors })
            }

            return res.status(200).json(result)
        }catch(error){
            next(error)
        }
    },

    async login(req, res, next){
        try{
            const validData = userLoginSchema.safeParse(req.body)

            if(validData.error){
                const errors = validData.error.flatten().fieldErrors
                console.log(errors)
                return res.status(400).json({ errors: errors })
            }

            const { email, password } = validData.data
            const result = userService.login({ email, password })

            if(result.label){
                const statusCode = getStatusCode(result.labels)

                return res.status(statusCode.statusCode).json({ errors: result.errors })
            }

            return res.status(200).json(result)
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController