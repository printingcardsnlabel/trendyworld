const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
            title: String,
            price: Number,
            quantity: Number,
            img: String
        }
    ],
    totalAmount: { type: Number, required: true },
    customerInfo: {
        name: String,
        phone: String,
        address: String
    },
    status: { type: String, default: 'Pending' }, // Pending, Shipped, Delivered
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);