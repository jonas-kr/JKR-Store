const { Register, Google, Login, Logout, getUser
} = require('../controllers/UserController')

const router = require('express').Router()

router.post('/register', Register)
router.post('/login', Login)
router.post('/google', Google)
router.get('/logout', Logout)
//get user Information
router.get('/:id', getUser)


module.exports = router