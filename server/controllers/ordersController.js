const Order = require("../models/OrderSchema")


const newOrder = async (req, res) => {
    const { totalPrice, cart, billingInfo } = req.body
    let userId = req.user?.userId
    if (!totalPrice || !cart || !billingInfo) {
        return res.status(400).json({ error: "All fields must be filled" })
    }

    try {
        const order = await Order.create({
            totalPrice, cart, billingInfo, userId
        })
        res.status(201).json({ message: "Order succesfully created", order })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
const updateOrder = async (req, res) => {
    if (!req.user?.admin) return res.status(400).json({ error: "User is not authorized" })
    const { state } = req.body

    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { state })
        res.status(201).json({ message: "Order succesfully Updated", order })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const getOrders = async (req, res) => {
    if (!req.user?.admin) return res.status(400).json({ error: "User is not authorized" })
    const { page = 1, limit = 10 } = req.query;
    try {
        const orders = await Order.find({})
            .sort({ "createdAt": -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        const count = await Order.countDocuments();
        if (orders.length === 0) {
            return res.status(200).json({ message: "There is no orders" })
        }

        return res.json({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            count,
        });
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}

const getOrder = async (req, res) => {
    const { id } = req.params
    try {
        const order = await Order.find({ id })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
const getUserOrders = async (req, res) => {
    if (!req.user) return res.status(400).json({ error: "User is not authorized" })
    const { page = 1, limit = 10 } = req.query;
    try {
        const orders = await Order.find({ userId: req.user.userId })
            .sort({ "createdAt": -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        const count = await Order.countDocuments();

        if (orders.length === 0) {
            return res.status(200).json({ message: "There is no orders" })
        }

        return res.json({
            orders,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            count,
        });
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
const delOrder = async (req, res) => {
    const { id } = req.params
    try {
        await Order.findOneAndDelete({ id })
        res.status(200).json({ message: "Order successfully deleted" })
    } catch (error) {
        res.status(500).json({ error: `error is ${error.message}` })
    }
}
module.exports = { newOrder, getOrders, getOrder, delOrder, getUserOrders, updateOrder }