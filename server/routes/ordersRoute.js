const { newOrder, getOrders, getOrder, delOrder, getUserOrders, updateOrder } = require('../controllers/ordersController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = require('express').Router()



router.get("/", authMiddleware, getOrders)
router.get("/user", authMiddleware, getUserOrders)
router.put("/:id", authMiddleware, updateOrder)
router.post('/new', authMiddleware, newOrder)

//Not used Routes
router.get("/:id", getOrder)
router.delete("/:id", delOrder)


module.exports = router