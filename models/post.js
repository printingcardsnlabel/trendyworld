const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    sizes: {
        type: [String],
        default: []
    },
    // Discount Logic
    isDiscount: {
        type: Boolean,
        default: false
    },
     isLimited: {
        type: Boolean,
        default: false
    },
    regularPrice: {

        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        default: null
    },
    // Product Status
    isNewArrival: {
        type: Boolean,
        default: false
    },
    // Image Gallery
    imgUrl: {
        type: String,
        required: true // Main Image
    },
    imgUrl2: String,
    imgUrl3: String,
    imgUrl4: String,
    imgUrl5: String,
    
    content: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;