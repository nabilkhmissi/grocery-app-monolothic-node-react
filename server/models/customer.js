const mongoose = require("mongoose")


const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        salt: { type: String, required: true },
        cart: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'product', require: true },
                quantity: { type: Number, require: true }
            }
        ],/*
        wishlist: [
            {
                type: Schema.Types.ObjectId, ref: 'product', require: true
            }
        ],*/
        orders: [
            { type: Schema.Types.ObjectId, ref: 'order', require: true }
        ]
    },
    {
        timestamps: true
    }
);

CustomerSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.salt
    delete obj.createdAt
    delete obj.updatedAt
    delete obj.__v
    return obj;
}
module.exports = mongoose.model('customer', CustomerSchema);