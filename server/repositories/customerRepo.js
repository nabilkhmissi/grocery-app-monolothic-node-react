const { CustomerModel } = require("../models")

const findAll = async () => {
    return await CustomerModel.find({});
}

const create = async (customer) => {
    return await CustomerModel.create(customer);
}


const findById = (id) => {
    return CustomerModel.findOne({ _id: id });
}

const findByEmail = (email) => {
    return CustomerModel.findOne({ email: email });
}

const deleteById = (id) => {
    return CustomerModel.deleteOne({ _id: id });
}

const update = (id, customer) => {
    return CustomerModel.updateOne({ _id: id }, customer);
}

const findCart = async (id) => {
    const customer = CustomerModel.findOne({ _id: id }).populate("cart");
    return customer.cart;
}

module.exports = {
    findAll,
    findById,
    findByEmail,
    deleteById,
    update,
    findCart,
    create
}
