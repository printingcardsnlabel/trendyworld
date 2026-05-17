const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
            title: String,
            price: Number,
            quantity: Number,
            img: String,
            size: { type: String, default: '' }
        }
    ],
    totalAmount: { type: Number, required: true },
    customerInfo: {
        name: String,
        phone: String,
        address: String
    },
    OrderId: {
        type: String,
        required: true,
        unique: true // Jate ek id duibar na ashe
    },
    status: { type: String, default: 'Pending' },
    statusTimestamps: {
        confirmedAt: { type: Date, default: null },
        shippedAt: { type: Date, default: null },
        deliveredAt: { type: Date, default: null }
    }, // Pending, Shipped, Delivered
    createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model('Order', orderSchema);