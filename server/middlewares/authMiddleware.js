const JWT = require('jsonwebtoken');
const User = require('../models/UserSchema');


const authMiddleware = (req, res, next) => {
    const token = req.cookies.User;

    if (!token) return next();

    try {
        JWT.verify(token, process.env.SECRET_PHRASE, async (err, user) => {
            if (err) return res.status(500).json({ message: "Token is not valid" })
            req.user = await User.findOne({ userId: user.id })

            next();
        });
    } catch (error) {
        return res.status(500).json({ message: `error is ${error.message}` })
    }
}

module.exports = authMiddleware