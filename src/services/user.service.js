const schemaValidator = require('../utils/schema.validator')
const userSchemaValidator = require('../utils/user.schema.validator')
const bcrypt = require('bcrypt')

class UserService{
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async store(data){
        try{
            if(!data) return {
                success:    false,
                error:      'UNPROCESSABLE_CONTENT',
                labels:     { data: 'No data provide.' }
            }

            const errors = schemaValidator(data, userSchemaValidator)

            if(Object.keys(errors).length > 0) return {
                success:    false,
                error:      'UNPROCESSABLE_CONTENT',
                labels:     errors
            }

            const { name, email, password } = data
            const trimmedName = name.trim()
            const trimmedEmail = email.trim().toLowerCase()

            const userExists = await this.userRepository.findByEmail(trimmedEmail)
                if(userExists) return {
                    success: false,
                    error: 'USER_ALREADY_EXISTS'
                }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = await this.userRepository.create({trimmedName, trimmedEmail, hashedPassword})

            return {
                success: true,
                user
            }

        }catch(error){
            console.error(error)

            if(error?.code === 'P2002') return {
                success: false,
                error: 'USER_ALREADY_EXISTS'
            }

            return {
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            }
        }
    }

    async index(){

    }
}

module.exports = UserService