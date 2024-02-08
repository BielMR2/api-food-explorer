const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const FavoritesController = require("../controllers/FavoritesController")

const favoritesRouter = Router()


const favoritesController = new FavoritesController()

favoritesRouter.use(ensureAuthenticated)

favoritesRouter.post("/:order_id", favoritesController.create)
favoritesRouter.get("/", favoritesController.index)
favoritesRouter.delete("/:order_id", favoritesController.delete)


module.exports = favoritesRouter