const UserRepository = require("../repositories/UserRepository")
const UsersValidatedService = require("../services/User/UserValidatedService")

class UsersValidatedController {
  async index(req, res) {
    const { user } = req;

    const userRepository = new UserRepository()
    const usersValidatedService = new UsersValidatedService(userRepository)

    try {
      await usersValidatedService.execute({ user })
      return res.status(201).json({ message: 'Usuário validado com sucesso' });
    } catch (error) {
        return res.status(400).json({ error });
    }
  }
}

module.exports = UsersValidatedController;