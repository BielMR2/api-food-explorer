const AppError = require("../../utils/AppError")

class UserCreateService {
    constructor(orderRepository, userRepository){
        this.orderRepository = orderRepository
        this.userRepository = userRepository
    }

    async execute({ user_id, title, description, category, price, ingredients }){
        const user = await this.userRepository.findById(user_id)

        if (!user) {
            throw new AppError("Usuário não encontrado.")
        }

        if(user.role !==  "admin"){
            throw new AppError("Apenas usuário admin pode criar um pedido")
        }

        const orderCreated = await this.orderRepository.create({ user_id, title, description, category, price, ingredients })
        return orderCreated
    }
}

module.exports = UserCreateService