const removeUndefinedFields = require('../utils/remove.undefined')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async store(data){
        try{
            const { name, email, password } = data

            const userExists = await this.userRepository.findByEmail(email)
            if(userExists) return {
                errors: {
                    'email': [ 'E-mail already in use.' ]
                },
                label: 'USER_ALREADY_EXISTS'
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await this.userRepository.create({ name, email, password: hashedPassword })

            return {
                user
            }

        }catch(error){
            console.error(error)

            if(error?.code === 'P2002') return {
                errors: {
                    "email": [ "E-mail already in use." ]
                },
                label: 'USER_ALREADY_EXISTS'
            }

            return {
                label: 'INTERNAL_SERVER_ERROR'
            }
        }
    }

    async index(reqFilter){
        try{
            const filter = removeUndefinedFields(reqFilter)

            const users = await this.userRepository.index(filter)

            return {
                success: true,
                users
            }
        }catch(error){
            console.error(error)
            return {
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            }
        }
    }

    async login(data){
        try{
            const { email, password } = data

            const user = await this.userRepository.loginAttempt(email)
            if(!user) return {
                errors: {
                    'login': ['Invalid e-mail or password.']
                },
                labels: 'UNAUTHORIZED'
            }

            const pwVerify = await bcrypt.compare(password, user.password)
            if(!pwVerify) return {
                errors: {
                    'login': ['Invalid e-mail or password.']
                },
                labels: 'UNAUTHORIZED'
            }        

            const payload = { email: user.email, role: user.role }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d'})
            delete user.password

            return {
                token,
                user
            }
        }catch(error){
            console.error(error)
            return { 
                label: 'INTERNAL_SERVER_ERROR'
            }
        }
    }
}

module.exports = UserService