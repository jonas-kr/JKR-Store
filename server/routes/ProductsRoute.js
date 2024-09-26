const router = require('express').Router()
const { NewProduct, GetProducts, GetProduct, DelProduct, UpdateProduct } = require('../controllers/ProductsController')
const authMiddleware = require('../middlewares/authMiddleware')


//Product routes
router.get('/', GetProducts)
router.get('/:id', GetProduct)
//Admin routes
router.post("/new", authMiddleware, NewProduct)
router.put('/:id', authMiddleware, UpdateProduct)
router.delete('/:id', authMiddleware, DelProduct)

module.exports = router