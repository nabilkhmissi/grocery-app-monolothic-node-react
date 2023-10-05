const { ProductModel } = require("../models");

const findAll = async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).send({ message: "products retrieved successfully", data: products })
}

const create = async (req, res) => {
    const { name, desc, unit, price, supplier } = req.body;
    if (!name || !desc || !unit || !supplier || !price) {
        res.status(400).send({ message: "invalid product details" })
        return;
    }

    const existProduct = await ProductModel.findOne({ name: name });
    if (existProduct) {
        res.status(400).send({ message: "this pproduct is already exist" })
        return;
    }

    const product = await ProductModel.create({
        name,
        desc,
        price,
        unit,
        available: true,
        supplier
    });
    res.status(200).send(product)
}
const findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            res.status(404).send({ message: "product with this id not found" });
            return;
        }
        res.status(200).send(product)
    } catch (error) {
        const err = new Error("product with this id not found");
        err.status = 404;
        next(err)
    }
}

const deleteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await ProductModel.deleteOne({ _id: id });
        res.status(200).send({ message: "product deleted successfully" })
    } catch (error) {
        const err = new Error("product with this id not found");
        err.status = 404;
        next(err)
    }
}

const update = async (req, res, next) => {
    const id = req.params.id;
    const newProduct = req.body;
    try {
        const updatedProduct = await ProductModel.updateOne({ _id: id }, newProduct);
        res.status(200).send({ message: "product updated successfully", data: updatedProduct })
    } catch (error) {
        const err = new Error("product with this id not found");
        err.status = 404;
        next(err)
    }
}

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
    update
}