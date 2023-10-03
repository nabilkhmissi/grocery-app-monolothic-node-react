const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: String,
    customerId: String,
    amount: Number,
    status: String,
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            unit: { type: Number, require: true }
        }
    ]
});

module.exports = mongoose.model('order', OrderSchema);