const knex = require("../database")

class OrdersRepository {
    async create({ user_id, title, description, category, price, ingredients }){  
        const [order_id] = await knex("orders").insert({ 
            user_id,
            title,
            price,
            description,
            category, 
        })

        if(ingredients){
            const ingredientsInsert = ingredients.map(name => {
                return {
                    user_id,
                    order_id,
                    name,
                }
            })

            await knex("ingredients").insert(ingredientsInsert)
        }
    }

    async update({ order, user }){
        const { id, title, description, category, price, ingredients, newIngredients } = order
        
        await knex("orders")
        .where({ id })
        .update({
            title,
            price,
            description,
            category, 
        })

        const newOrder = await knex("orders").where({ id }).first()

        if(newIngredients){
            const ingredientsRemoveId = ingredients.map(name => name.id)
            await knex("ingredients").whereIn("id", ingredientsRemoveId).del()

            const ingredientsInsert = newIngredients.map(name => {
                return {
                    user_id: user.id,
                    order_id: newOrder.id,
                    name,
                }
            })
            await knex("ingredients").insert(ingredientsInsert)
        
        }
    }

    async delete(id){
        try {
            await knex("orders").where({ id }).delete();
        } catch (error) {
            console.error("Erro ao excluir pedido por ID:", error);
            throw error;
        }
    }

    async show(id) {
        const order = await knex("orders").where({ id }).first()
        if(!order){
            return null
        }
    
        const ingredients = await knex("ingredients").where({ order_id: order.id })
        order.ingredients = ingredients
        return order
    }

    async showAllByTitle({ title }) {
        const orders = await knex("orders").whereLike('title', `%${title}%`);
    
        const ordersWithIngredients = Promise.all(orders.map(async order => {
            order.ingredients = await knex("ingredients").where({ order_id: order.id });
            return order;
        }));
    
        return ordersWithIngredients;
    }
}

module.exports = OrdersRepository