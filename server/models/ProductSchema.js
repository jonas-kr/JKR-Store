const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ProductSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    salePrice: {
        type: Number,
    },
    images: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String],
    },
    colors: {
        type: [String],
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    bestSeller: {
        type: Boolean,
        default:false
    }

}, { timestamps: true })

ProductSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 10 });

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product