const { hash } = require("bcryptjs")
const AppError = require("../../utils/AppError")

class UserCreateService {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({ name, email, password, confirmPassword }){
        const checkUserExists = await this.userRepository.findByEmail(email)

        if (checkUserExists) {
            throw new AppError("Este e-mail já está em uso.")
        }

        if(password.length < 6){
            throw new AppError("A senha deve ter no mínimo 6 caracteres. Por favor, escolha uma senha mais longa.")
        }

        if(password !== confirmPassword){
            throw new AppError("As senhas não coincidem. Por favor, verifique e tente novamente.")
        }

        const hashedPassword = await hash(password, 9)

        const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })
        return userCreated
    }
}

module.exports = UserCreateService