const AppError = require("../../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../../Config/auth")
const { sign } = require("jsonwebtoken")

class UserCreateSessionService {
    constructor(userRepository){
        this.userRepository = userRepository
    }

    async execute({ email, password, res }){
        const user = await this.userRepository.findByEmail(email)
        if(!user) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const passwordMatch = await compare(password, user.password)
        if(!passwordMatch) {
            throw new AppError("Email e/ou senha incorreta", 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            // maxAge: 24 * 60 * 60 * 1000
        })

        delete user.password
        
        return user
    }
}

module.exports = UserCreateSessionService