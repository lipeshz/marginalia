const { prisma } = require('../config/db')

class userRepository{
    async findByEmail(email){
        return prisma.user.findUnique({where: {email}})
    }

    async create(data){
        const { trimmedName, trimmedEmail, hashedPassword } = data
        return prisma.user.create({
            data: {
                name: trimmedName,
                email: trimmedEmail,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        }) 
    }
}

module.exports = new userRepository()