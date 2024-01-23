const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../Config/uploads")

const OrdersController = require("../controllers/OrdersController")
const OrdersImageController = require("../controllers/OrdersImageController")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")



const orderRouter = Router()
const upload = multer(uploadConfig.MULTER)

const ordersController = new OrdersController()
const ordersImageController = new OrdersImageController()

orderRouter.use(ensureAuthenticated)

orderRouter.get("/", ordersController.index)
orderRouter.get("/:id", ordersController.show)

orderRouter.post("/", ordersController.create)
orderRouter.put("/", ordersController.update)
orderRouter.patch("/upload", upload.single("image"), ordersImageController.update)

orderRouter.delete("/:id", ordersController.delete)

module.exports = orderRouter