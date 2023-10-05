const { CustomerModel } = require("../models")
const password_utility = require("../utility/password-utility");

const findAll = async (req, res) => {
    const customers = await CustomerModel.find({});
    res.status(200).send({ message: "customers retrieved successfully", data: customers })
}

const createCustomer = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).send({ message: "invalid customer details" })
        return;
    }

    const existCustomer = await CustomerModel.findOne({ email: email });
    if (existCustomer) {
        res.status(400).send({ message: "this email is already in use" })
        return;
    }

    const salt = await password_utility.genSalt();
    const userPassword = await password_utility.hashPassword(password, salt)

    const new_customer = await CustomerModel.create({
        name,
        email,
        password: userPassword,
        salt: salt
    });
    res.status(200).send(new_customer)
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

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const customer = await CustomerModel.findOne({ email: email });
    console.log(customer)

    if (!customer) {
        res.status(404).send({ message: "customer with this id not found" });
        return;
    }

    const isValidPassword = await password_utility.validatePassword(password, customer.password, customer.salt);
    if (!isValidPassword) {
        res.status(403).send({ message: "invalid credentials" })
        return;
    }

    res.status(200).send({ message: "logged in succesfully", data: customer })
}

module.exports = {
    findAll,
    findById,
    createCustomer,
    deleteById,
    updateCustomer,
    findCart,
    addToCart,
    login
}