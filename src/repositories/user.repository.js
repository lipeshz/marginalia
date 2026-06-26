const { prisma } = require('../config/db')

class userRepository{
    async findByEmail(email){
        return prisma.user.findUnique({where: {email}, select: { email: true }})
    }

    async loginAttempt(email){
        return prisma.user.findUnique({where: {email}, select: { email: true, password: true, role: true }})
    }

    async create(data){
        const { name, email, password } = data
        return prisma.user.create({
            data: {
                name,
                email,
                password
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        }) 
    }

    async index(filter){
        return prisma.user.findMany({ where: { OR: [filter] }, select: { id: true, name: true }})
    }
}

module.exports = new userRepository()