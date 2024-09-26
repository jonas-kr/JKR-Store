const User = require('../models/UserSchema')
const Review = require('../models/ReviewSchema')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config()



/**************** Create JWT FUNCTION ***************/
const createToken = (id) => {
    return JWT.sign({ id }, process.env.SECRET_PHRASE)
}

/**************** Register FUNCTION ***************/
const Register = async (req, res) => {
    const {
        fullName, email, password, admin
    } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    const exist = await User.findOne({ email })
    if (exist) {
        return res.status(400).json({ error: "Email already taken" })
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({
            fullName, email, password: hashed, admin
        })
        res.status(201).json({ message: "User succesfully created", user })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

/**************** Login FUNCTION ***************/
const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Incorrect email" })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ error: "Incorrect password" })
        }

        const token = createToken(user.userId)

        const expiryDate = new Date(Date.now() + 3600000 * 24 * 30); // 1 month
        res
            .cookie('User', token, {
                httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true
            })
            .status(200)
            .json({ message: "User signed in", expiryDate });
    } catch (error) {
        return res.status(500).json({ error: `${error.message}` })
    }
};


/**************** Google Login FUNCTION ***************/
const Google = async (req, res) => {
    const { email, name } = req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = createToken(user.userId)
            const expiryDate = new Date(Date.now() + 3600000 * 24 * 30); // 1 hour
            res
                .cookie('User', token, {
                    httpOnly: true,
                    expires: expiryDate,
                    sameSite: 'None', secure: true
                })
                .status(200)
                .json({ message: "User is signed in" });
        } else {
            const newUser = User.create({
                fullName:
                    name.split(' ').join('').toLowerCase(),
                email
            })

            const token = createToken(newUser.userId)
            const expiryDate = new Date(Date.now() + 3600000 * 24 * 30); // 1 hour
            res
                .cookie('User', token, {
                    httpOnly: true,
                    expires: expiryDate,
                    sameSite: 'None', secure: true
                })
                .status(200)
                .json({ message: "User is Saved to DB And signed in" });
        }
    } catch (error) {
        return res.status(500).json({ message: `error is ${error.message}` })
    }
};

const Logout = (req, res) => {
    res.clearCookie('User').status(200).json('Logout success!');
};

const NewReview = async (req, res) => {
    if (!req.user) return res.status(400).json({ error: "User is not authorized" })
    const {
        productId, stars, comment
    } = req.body

    if (!productId || !stars || !comment) {
        return res.status(400).json({ error: "All fields must be filled" })
    }
    try {
        const review = await Review.create({
            userId: req.user.userId, productId, stars, comment
        })
        res.status(201).json({ message: "Review succesfully created", review })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

const getReviews = async (req, res) => {
    const { id } = req.params
    try {
        const reviews = await Review.find({ productId: id }).sort({ "createdAt": -1 })
        if (!reviews) {
            return res.status(200).json({ message: "No reviews with this Id" })
        }
        const mid = reviews.reduce((acc, r) => acc + r.stars, 0) / reviews.length
        const count = await Review.countDocuments({ productId: id })

        return res.status(200).json({ reviews, mid, count })
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ userId: id })
        if (!user) {
            return res.status(200).json({ message: "No user with this Id" })
        }
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: `Error is ${error.message}` })
    }
}


module.exports = { Register, Google, Login, Logout, NewReview, getReviews, getUser }