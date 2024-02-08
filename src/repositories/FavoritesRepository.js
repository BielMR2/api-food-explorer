const knex = require("../database")

class FavoritesRepository {
    async create({ order_id, user_id }){
        await knex("favorites").insert({ order_id, user_id })
    }

    async findByUser_Id({ user_id }){
        const favoritesOrders = await knex("favorites").where({ user_id }).select()

        if(favoritesOrders.length === 0){
            return null
        }

        return favoritesOrders
    }

    async find({ order_id, user_id }){
        const order = await knex("favorites").where({ user_id, order_id }).select()
        console.log(order)
        return order
    }

    async delete({ user_id, order_id }){
        const IdOrderDelete = await knex("favorites").where({ user_id, order_id }).del()
        return IdOrderDelete
    }
}

module.exports = FavoritesRepository