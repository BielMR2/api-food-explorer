const AppError = require("../utils/AppError")

class OrdersShowService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository
    }

    async execute({ id }){
        const order = await this.orderRepository.show(id)

        if(!order){
            throw new AppError("Pedido não encontrado!")
        }

        return order
    }
}

module.exports = OrdersShowService