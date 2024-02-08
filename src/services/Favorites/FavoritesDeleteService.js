class FavoritesDeleteService {
    constructor(orderRepository, favoritesRepository){
        this.orderRepository = orderRepository
        this.favoritesRepository = favoritesRepository
    }

    async execute({ user_id, order_id }){
        const order = await this.orderRepository.show(order_id)

        if (!order) {
            throw new AppError("Pedido não encontrado!")
        }


        const IdOrderDelete = await this.favoritesRepository.delete({ user_id, order_id })


        return IdOrderDelete
    }
}

module.exports = FavoritesDeleteService