const schemaValidator = require('../utils/schema.validator')
const userSchemaValidator = require('../utils/user.schema.validator')
const { prisma } = require('../config/db')
const bcrypt = require('bcrypt')

class UserService{
    async store(data){
        try{
            const { name, email, password } = data
            const errors = schemaValidator(data, userSchemaValidator)

            if(Object.keys(errors).length > 0) return {
                success: false,
                error: "UNPROCESSABLE_CONTENT",
                labels: errors
            }

            const userExists = await prisma.user.findUnique({where: {email}})

            if(userExists) return {
                success: false,
                error: "USER_ALREADY_EXISTS",
                labels: "E-mail already in use."
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                },
                select: {
                    name: true,
                    email: true
                }
            })

            return {
                success: true,
                user
            }
        }catch(error){
            return {
                success: false,
                error
            }
        }
    }
}

module.exports = new UserService()