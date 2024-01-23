const knex = require("../database")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require("../Config/auth")
const { sign } = require("jsonwebtoken")

class SessionsController {
    async create(req, res) {
        const { email, password } = req.body

        const user = await knex("users").where({ email }).first()

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
            maxAge: 60 * 60 * 1000
        })

        delete user.password

        return res.json({ user })
    }
}

module.exports = SessionsController