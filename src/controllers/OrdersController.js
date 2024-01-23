const OrdersRepository = require("../repositories/OrdersRepository")
const UserRepository = require("../repositories/UserRepository")
const OrderCreateService = require("../services/OrderCreateService")
const OrderDeleteService = require("../services/OrderDeleteService")
const OrdersIndexService = require("../services/OrdersIndexService")
const OrdersShowService = require("../services/OrderShowService")
const OrdersUpdateService = require("../services/OrderUpdateService")

class OrdersController {
    async create(req, res) {
        const { title, description, category, price, ingredients } = req.body
        const user_id = req.user.id

        const userRepository = new UserRepository()
        const ordersRepository = new OrdersRepository()
        const orderCreateService = new OrderCreateService(ordersRepository, userRepository)

        try {
            await orderCreateService.execute({ user_id, title, description, category, price, ingredients })
            return res.status(201).json({ message: 'Pedido criado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async update(req, res) {
        const { order_id, title, description, category, price, ingredients } = req.body
        const user_id = req.user.id

        const ordersRepository = new OrdersRepository()
        const userRepository = new UserRepository()
        const ordersUpdateService = new OrdersUpdateService(ordersRepository, userRepository)

        try {
            await ordersUpdateService.execute({ user_id, order_id, title, description, category, price, ingredients })
            return res.status(201).json({ message: 'Pedido atualizado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async delete(req, res) {
        const { id } = req.params

        const ordersRepository = new OrdersRepository()
        const orderDeleteService = new OrderDeleteService(ordersRepository)

        try {
            await orderDeleteService.execute({ id })
            return res.status(201).json({ message: 'Pedido deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async index(req, res) {
        const { title } = req.query

        const ordersRepository = new OrdersRepository()
        const ordersIndexService = new OrdersIndexService(ordersRepository)

        try {
            const orders = await ordersIndexService.execute({ title })
            return res.json(orders)
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    async show(req, res) {
        const { id } = req.params

        const ordersRepository = new OrdersRepository()
        const ordersShowService = new OrdersShowService(ordersRepository)

        try {
            const order = await ordersShowService.execute({ id })
            return res.json(order)
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

module.exports = OrdersController