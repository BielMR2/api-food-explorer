const AppError = require("../../utils/AppError")

class FavoritesIndexService{
    constructor(favoritesRepository){
        this.favoritesRepository = favoritesRepository
    }

    async execute({ user_id }){
        const favoritesOrders = await this.favoritesRepository.findByUser_Id({ user_id })

        if(!favoritesOrders){
            throw new AppError("Nenhum pedido encontrado!")
        }

        return favoritesOrders
    }

}


module.exports = FavoritesIndexService