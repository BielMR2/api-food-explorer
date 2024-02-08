const AppError = require("../../utils/AppError")

class FavoritesCreateService {
    constructor(orderRepository, favoritesRepository){
        this.orderRepository = orderRepository
        this.favoritesRepository = favoritesRepository
    }

    async execute({ user_id, order_id }){
        const order = await this.orderRepository.show(order_id)
        if (!order) {
            throw new AppError("Pedido não encontrado!")
        }

        const alreadExists = await this.favoritesRepository.find({ order_id, user_id })
        console.log(alreadExists)
        if (alreadExists) {
            throw new AppError("Pedido já está marcado como favorito!")
        }

        await this.favoritesRepository.create({ order_id, user_id })

        return order
    }
}


module.exports = FavoritesCreateService