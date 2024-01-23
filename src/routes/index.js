const { Router } = require("express")

const usersRouter = require("./users.routes")
const orderRouter = require("./orders.routes")
const sessionsRouter = require("./sessions.routes")


const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)

routes.use("/orders", orderRouter)

module.exports = routes
