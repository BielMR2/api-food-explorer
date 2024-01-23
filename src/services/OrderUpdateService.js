const AppError = require("../utils/AppError")

class OrdersUpdateService {
    constructor(orderRepository, userRepository) {
        this.orderRepository = orderRepository
        this.userRepository = userRepository
    }

    async execute({ user_id, order_id, title, description, category, price, ingredients }){
        const [user, order] = await Promise.all([
            this.userRepository.find(user_id),
            this.orderRepository.show(order_id)
        ]);
    
        if (!user) {
            throw new AppError("Usuário não encontrado.");
        }
    
        if (!order) {
            throw new AppError("Pedido não encontrado.");
        }
        
        order.user_id = user_id
        order.title = title ?? order.title
        order.description = description ?? order.description
        order.category = category ?? order.category
        order.price = price ?? order.price
        order.newIngredients = ingredients ?? order.newIngredients

        const orderUpdate = await this.orderRepository.update({ order, user })
        return orderUpdate
    }
}

module.exports = OrdersUpdateService