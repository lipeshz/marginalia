class UserService{
    async store(data){
        return {
            success: true,
            data
        }
    }
}

module.exports = UserService