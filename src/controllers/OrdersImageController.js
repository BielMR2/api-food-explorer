const knex = require("../database")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class OrdersImageController {
    async update(req, res){
        const { order_id, user_id } = req.query
        const imageFileName = req.file.filename

        const diskStorage = new DiskStorage()

        const order = await knex("orders").where({ id: order_id }).first()
        const user = await knex("users").where({ id: user_id }).first()

        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        if(order.user_id !== user.id){
            throw new AppError("Somente o dono do prato pode mudar a imagem")
        }

        console.log(order)
        if(order.image){
            await diskStorage.deleteFile(order.image)
        }

        const filename = await diskStorage.saveFile(imageFileName)
        order.image = filename

        await knex("orders").where({ id: order_id }).update(order)

        return res.json(order)
    }
}
module.exports = OrdersImageController