const UserRepository = require("../repositories/UserRepository")
const UserCreateService = require("../services/UserCreateService")

class UsersController {
    async create(request, response) {
        const { name, email, password, confirmPassword } = request.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        try {
            await userCreateService.execute({ name, email, password, confirmPassword })
            return response.status(201).json({ message: 'Usuário criado com sucesso' });
        } catch (error) {
            return response.status(400).json({ error });
        }
    }
}

module.exports = UsersController