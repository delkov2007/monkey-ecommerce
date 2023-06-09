const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50,
        text: true
    },
    slug: {
        type: String,
        lowercase: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxLength: 500,
        text: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxLength: 32,
    },
    category: {
        type: ObjectId,
        ref: 'Category',
    },
    sub: [{
        type: ObjectId,
        ref: 'Sub'
    }],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No']
    },
    color: {
        type: String,
        enum: ['Black', 'White', 'Blue', 'Silver', 'Brown']
    },
    brand: {
        type: String,
        enum: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'Asus ']
    },
    // ratings: [{
    //     star: Number,
    //     postedBy: { type: ObjectId, ref: 'User' }
    // }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);