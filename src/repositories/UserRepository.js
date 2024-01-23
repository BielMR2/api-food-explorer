const knex = require("../database")

class UserRepository {
    async find(id){
        const user = await knex("users").where({ id }).first()

        if(!user){
            return null
        }
        
        return user
    }


    async create({ name, email, password }){
        const userId = await knex("users").insert({ name, email, password })
        return { id: userId }
    }
}

module.exports = UserRepository