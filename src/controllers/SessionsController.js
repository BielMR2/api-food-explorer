const UserRepository = require("../repositories/UserRepository")
const UserCreateSessionService = require("../services/User/UserCreateSessionService")

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body
        
        const userRepository = new UserRepository()
        const userCreateSessionService = new UserCreateSessionService(userRepository)
        
        try {
            const user = await userCreateSessionService.execute({ email, password, res })
            res.json({ message: 'Usuário validado com sucesso ', user })
        } catch (error) {
            return res.status(400).json({ error });
        }
    }
}

module.exports = SessionsController