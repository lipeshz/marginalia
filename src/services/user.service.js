class UserService{
    async store(data){
        for(const key in data){
            if(data[key] === null || data[key] === "" || data[key] === undefined) return {
                success
            }
        }
    }
}

module.exports = new UserService()