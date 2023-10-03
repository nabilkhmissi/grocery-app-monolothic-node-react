const mongoose = require("mongoose")


const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
    name: String,
    email: String,
    hashedPassword: String,
    cart: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'product', require: true },
            unit: { type: Number, require: true }
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId, ref: 'product', require: true
        }
    ],
    orders: [
        { type: Schema.Types.ObjectId, ref: 'order', require: true }
    ]
});

module.exports = mongoose.model('customer', CustomerSchema);