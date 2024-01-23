class OrdersIndexService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository
    }

    async execute({ title }){
        const orders = await this.orderRepository.showAllByTitle({ title })
        return orders
    }
}

module.exports = OrdersIndexService