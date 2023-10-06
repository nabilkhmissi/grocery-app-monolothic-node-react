const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    amount: Number,
    status: String,
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, require: true }
        }
    ]
});

module.exports = mongoose.model('order', OrderSchema);