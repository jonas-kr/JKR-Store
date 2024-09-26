const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Billing = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    street: String,
    mnplct: String,
    state: Number,
})

const CartItem = new mongoose.Schema({
    productId: Number,
    name: String,
    image: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String
})


const OrderSchema = new mongoose.Schema({
    _id: Number,
    userId: Number,
    state: {
        type: String,
        default: "Order Placed"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    cart: [CartItem],
    billingInfo: Billing


}, { timestamps: true })

OrderSchema.plugin(AutoIncrement, { inc_field: '_id', start_seq: 10 });

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order