const mongoose = require('mongoose');
const Category = require('./CategoryModel');
const Review = require('./ReviewModel');

const imageSchema = mongoose.Schema({
    path: { type: String, required: true }
});

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    /* category: { type: mongoose.Schema.Types.ObjectId, ref: Category, required: true }, */
    category: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number },
    reviewsNumber: { type: Number, default: 0 },
    sales: { type: Number, default: 0 },
    attributes: [ { key: String, value: String } ],
    images: [imageSchema],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Review
    }]
}, { timestamps: true });
productSchema.index({ name: "text", description: "text" }, { name: "TextIndex" });  // estos Index son para realizar búsquedas más rápidas
productSchema.index({ "attributes.key":1, "attributes.value":1 });  // lo mismo con esto, podemos buscar por nombre, descripción o atributos

const Product = mongoose.model("Product", productSchema);

module.exports = Product;