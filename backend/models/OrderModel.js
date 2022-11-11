const mongoose = require('mongoose');
const User = require('./UserModel');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },
    orderTotal: {
        itemsCount: { type: Number, required: true },
        cartSubtotal: { type: Number, required: true }
    },
    cartItems: [{ 
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { path: { type: String, required: true } },
        quantity: { type: Number, required: true },
        count: { type: Number, required: true } 
    }],
    paymentMethod: String,
    transactionResult: {
        status: String,
        createTime: String,
        amount: Number
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: Date

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;