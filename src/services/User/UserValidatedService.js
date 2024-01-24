const AppError = require("../../utils/AppError")

class UsersValidatedController {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({ user }){
        const checkUserExists = await this.userRepository.findById(user.id)

        if (!checkUserExists) {
            throw new AppError("Unauthorized", 401)
        }
    }
}

module.exports = UsersValidatedController