const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const port = process.env.PORT || 4000


const UserRoute = require('./routes/UserRoute')
const ProductsRoute = require('./routes/ProductsRoute')
const reviewsRoute = require('./routes/reviewsRoute')
const ordersRoute = require('./routes/ordersRoute')




//Activating cors middleware so we can make requests from the origin
app.use(cors({
    origin: 'https://ecommerce-forever.vercel.app' && 'http://localhost:5173',
    credentials: true
}))

//Accept json in req body
app.use(express.json())
app.use(cookieParser());



//All the routes
app.use('/api/auth', UserRoute)
app.use('/api/products', ProductsRoute)
app.use('/api/orders', ordersRoute)
app.use('/api/reviews', reviewsRoute)


app.get("/", (req, res) => {
    res.status(200).send("This is E-commerce API")
})


//Connect to database and start listening
mongoose.connect(process.env.DB_URI).then(() => {
    app.listen(port, () => {
        console.log("Database is connected");
        console.log("Listening on Port", port);
    })
}).catch((err) => { console.log(err); })