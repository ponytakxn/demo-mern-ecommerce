const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    address: String,
    country: String,
    city: String,
    zipCode: Number,
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;