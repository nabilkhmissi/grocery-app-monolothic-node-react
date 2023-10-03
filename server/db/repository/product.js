const { ProductModel } = require("../models");

const saveProduct = async ({ name, desc, unit, price, supplier }) => {
    const product = await ProductModel({
        name,
        desc,
        unit,
        price,
        supplier,
        available: true
    }).save();
    return product;
}

const findById = async (id) => {
    const product = await ProductModel.findById(id);
    return product;
}

const deleteById = async (id) => {
    const product = await ProductModel.deleteOne({ _id: id });
    return "deleted successfully"
}

const update = async (id, product) => {
    const updateProduct = await ProductModel.findOneAndUpdated({ _id: id, product }, { new: true });
    return updateProduct;
}



module.exports = { saveProduct, update, findById, deleteById }