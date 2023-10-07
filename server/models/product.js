const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: String,
        desc: String,
        image: String,
        unit: Number,
        price: Number,
        available: Boolean,
        suplier: String
    },
    {
        timestamps: true
    }
);

ProductSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.__v
    delete obj.createAt
    delete obj.updatedAt
    return obj;
}


module.exports = mongoose.model('product', ProductSchema);