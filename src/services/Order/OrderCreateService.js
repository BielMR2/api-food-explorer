const { hash } = require("bcryptjs")
const AppError = require("../../utils/AppError")

class UserCreateService {
    constructor(orderRepository, userRepository){
        this.orderRepository = orderRepository
        this.userRepository = userRepository
    }

    async execute({ user_id, title, description, category, price, ingredients }){
        const checkUserExists = await this.userRepository.findById(user_id)

        if (!checkUserExists) {
            throw new AppError("Usuário não encontrado.")
        }

        const orderCreated = await this.orderRepository.create({ user_id, title, description, category, price, ingredients })
        return orderCreated
    }
}

module.exports = UserCreateService