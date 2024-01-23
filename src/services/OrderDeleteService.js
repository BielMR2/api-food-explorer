const AppError = require("../utils/AppError")

class OrderDeleteService {
    constructor(orderRepository){
        this.orderRepository = orderRepository
    }

    async execute({ id }){
        const verifyOrderExist = await this.orderRepository.show(id)

        if(!verifyOrderExist){
            throw new AppError("Pedido não existe")
        }

        const orderDelete = await this.orderRepository.delete(id)
        return orderDelete
    }
}

module.exports = OrderDeleteService