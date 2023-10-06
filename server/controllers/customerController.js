const { CustomerModel } = require("../models")

const findAll = async (req, res) => {
    const user = req.user;

    const customers = await CustomerModel.find({});
    res.status(200).send({ message: "customers retrieved successfully", data: customers })
}


const findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await CustomerModel.findById(id);
        if (!customer) {
            res.status(404).send({ message: "customer with this id not found" });
            return;
        }
        res.status(200).send(customer)
    } catch (error) {
        const err = new Error("user with this id not found");
        err.status = 404;
        next(err)
    }
}


const findByEmail = async (email) => {
    try {
        const customer = await CustomerModel.findOne({ email: email });
        if (!customer) {
            res.status(404).send({ message: "customer with this email not found" });
            return;
        }
        return customer;
    } catch (error) {
        const err = new Error("user with this email not found");
        err.status = 404;
        throw err;
    }
}

const deleteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await CustomerModel.deleteOne({ _id: id });
        res.status(200).send({ message: "customer deleted successfully" })
    } catch (error) {
        const err = new Error("user with this id not found");
        err.status = 404;
        next(err)
    }
}

const updateCustomer = async (req, res, next) => {
    const id = req.params.id;
    const newCustomer = req.body;
    try {
        const updatedUser = await CustomerModel.updateOne({ _id: id }, newCustomer);
        res.status(200).send({ message: "customer updated successfully", data: updatedUser })
    } catch (error) {
        const err = new Error("user with this id not found");
        err.status = 404;
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
        const customer = await CustomerModel.findById(id).populate('cart');
        if (!customer) {
            res.status(404).send({ message: "customer with this id not found" });
            return;
        }
        let cart = customer.cart;

        res.status(200).send({ message: "cart retrieved successfully", cart: cart });

    } catch (error) {
        const err = new Error("enable to get client cart");
        err.status = 404;
        next(err)
    }

}

const createCustomer = async (customer) => {
    return await CustomerModel.create(customer);
}


module.exports = {
    findAll,
    findById,
    deleteById,
    updateCustomer,
    findCart,
    addToCart,
    findByEmail,
    createCustomer
}