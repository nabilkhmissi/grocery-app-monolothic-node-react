const { CustomerModel } = require("../models")
const ApiError = require("../errors/ApiError");


const findAll = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new ApiError("Not authorized", 403)
        }
        const customers = await CustomerModel.find({});
        res.status(200).send({ message: "customers retrieved successfully", data: customers })
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) {
            throw new ApiError("customer with this id not found", 404);
        }
        res.status(200).send(customer)
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = CustomerModel.findById(id);
        if (!customer) {
            throw new ApiError("custmer with this id not found", 404)
        }
        await CustomerModel.deleteById(id);
        res.status(200).send({ message: "customer deleted successfully" })
    } catch (error) {
        next(err)
    }
}
const updateCustomer = async (req, res, next) => {
    const id = req.params.id;
    const newCustomer = req.body;
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) {
            throw new ApiError("custmer with this id not found", 404)
        }
        const updatedUser = await CustomerModel.updateOne({ _id: id }, newCustomer);
        res.status(200).send({ message: "customer updated successfully", data: updatedUser })
    } catch (error) {
        next(err)
    }
}
const addToCart = async (req, res, next) => {
    /*  const { customerId, product, unit, isRemove } = req.body;
     try {
         const customer = await CustomerModel.findById(customerId).populate('cart');
         if (!customer) {
             res.status(404).send({ message: "customer with this id not found" });
             return;
         }
         let cart = customer.cart;
 
         cart.push({ product, unit })
 
         customer.cart = cart;
         const updated_customer = await customer.save()
 
         res.status(200).send({ message: "cart updated successfully", cart: updated_customer.cart });
 
     } catch (error) {
         const err = new Error("user with this id not found");
         err.status = 404;
         next(err)
     } */

}
const findCart = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await CustomerModel.findById(id).populate("cart");
        if (!customer) {
            throw new ApiError("custmer with this id not found", 404)
        }
        let cart = customer.cart;

        res.status(200).send({ message: "cart retrieved successfully", cart: cart });

    } catch (error) {
        next(error)
    }

}
const createCustomer = async (customer) => {
    try {
        const customer = CustomerModel.findOne({ email: email });
        if (customer) {
            throw new Error("Customer with this email already exist")
        }
        const created_customer = await CustomerModel.create(customer);
        res.status(200).send({ message: "customer created successfully", data: created_customer })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    findAll,
    findById,
    deleteById,
    updateCustomer,
    findCart,
    addToCart,
    createCustomer
}