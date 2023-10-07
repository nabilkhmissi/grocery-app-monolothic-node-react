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
//cart
const findCart = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await CustomerModel.findById(id).populate("cart.product");
        if (!customer) {
            throw new ApiError("custmer with this id not found", 404)
        }
        let cart = customer.cart;

        res.status(200).send({ message: "cart retrieved successfully", cart: cart });

    } catch (error) {
        next(error)
    }
}
const addToCart = async (req, res, next) => {
    const { customerId, product, qty, isRemove } = req.body;
    try {
        const customer = await CustomerModel.findById(customerId).populate('cart');
        if (!customer) {
            throw new ApiError("customer with this id not found")
        }
        let cart = customer.cart;
        let cartItem = { product, quantity: qty };

        if (cart.length === 0) {
            cart.push(cartItem)
        } else {
            let exist = false;
            cart.map(item => {
                if (item.product._id.toString() === product._id.toString()) {
                    exist = true;
                    if (isRemove) {
                        cart.splice(cart.indexOf(item), 1);
                    } else {
                        item.quantity = qty
                    }
                }
            })
            if (!exist) {
                cart.push({ product, quantity: qty })
            }
        }

        customer.cart = cart;
        await customer.save();

        res.status(200).send({ message: "cart updated successfully" });

    } catch (error) {
        next(error)
    }

}

//order
const findOrders = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await CustomerModel.findById(id).populate("orders");
        if (!customer) {
            throw new ApiError("custmer with this id not found", 404)
        }
        let orders = customer.orders;

        res.status(200).send({ message: "orders retrieved successfully", orders: orders });

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
    createCustomer,
    findOrders
}