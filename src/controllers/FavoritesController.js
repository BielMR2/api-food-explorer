const OrdersRepository = require("../repositories/OrdersRepository")
const FavoritesRepository = require("../repositories/FavoritesRepository")

const FavoritesCreateService = require("../services/Favorites/FavoritesCreateService")
const FavoritesIndexService = require("../services/Favorites/FavoritesIndexService")
const FavoritesDeleteService = require("../services/Favorites/FavoritesDeleteService.js")

class FavoritesController {
    async create(req, res){
        const user_id = req.user.id
        const { order_id } = req.params

        const ordersRepository = new OrdersRepository()
        const favoritesRepository = new FavoritesRepository()
        const favoritesCreateService = new FavoritesCreateService(ordersRepository, favoritesRepository)

        try {
            const favoritesOrders = await favoritesCreateService.execute({ user_id, order_id })
            return res.status(201).json({ message: "Pedido favoritado com sucesso!", favoritesOrders })
        } catch (error) {
            return res.status(400).json({ error })
        }
    }

    async index(req, res){
        const user_id = req.user.id

        const favoritesRepository = new FavoritesRepository()
        const favoritesIndexService = new FavoritesIndexService(favoritesRepository)

        try {
            const orders = await favoritesIndexService.execute({ user_id })
            return res.status(201).json({ orders })
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async delete(req, res){
        const user_id = req.user.id
        const { order_id } = req.params

        const ordersRepository = new OrdersRepository()
        const favoritesRepository = new FavoritesRepository()
        const favoritesDeleteService = new FavoritesDeleteService(ordersRepository, favoritesRepository)

        try {
            const IdOrderDelete = await favoritesDeleteService.execute({ user_id, order_id })
            return res.status(201).json({ IdOrderDelete })
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}


module.exports = FavoritesController