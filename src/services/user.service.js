const schemaValidator = require('../utils/schema.validator')
const userSchemaValidator = require('../utils/user.schema.validator')
const { prisma } = require('../config/db')
const bcrypt = require('bcrypt')

class UserService{
    async store(data){
        try{
            const errors = schemaValidator(data, userSchemaValidator)

            if(Object.keys(errors).length > 0) return {
                success: false,
                error: 'VALIDATION_ERROR',
                labels: errors
            }

            const { name, email, password } = data
            const trimmedEmail = email.trim().toLowerCase()

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    name,
                    email: trimmedEmail,
                    password: hashedPassword
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            return {
                success: true,
                user
            }
        }catch(error){
            if(error.code === "P2002") return {
                success: false,
                error: 'USER_ALREADY_EXISTS'
            }

            console.error(error)
            return {
                success: false,
                error: 'INTERNAL_SERVER_ERROR'
            }
        }
    }
}

module.exports = new UserService()