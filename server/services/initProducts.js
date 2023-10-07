const data = require("./products_init");
const { ProductModel } = require("../models");

module.exports = db_init = async () => {
    const products = await ProductModel.find({});
    if (products.length > 0) {
        return;
    }
    data.forEach(element => {
        ProductModel.create(element)
    });
}