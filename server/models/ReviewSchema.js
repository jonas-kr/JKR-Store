const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ReviewSchema = new mongoose.Schema({
    reviewId: {
        type: Number,
    },
    userId: {
        type: Number,
        required: true,
    },
    productId: {
        type: Number,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true })

ReviewSchema.plugin(AutoIncrement, { inc_field: 'reviewId', start_seq: 10 });

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review