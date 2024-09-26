const { NewReview, getReviews } = require('../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = require('express').Router()

router.post('/new', authMiddleware, NewReview)
router.get('/:id', getReviews) //get product reviews

//router.delete('/:id')


module.exports = router