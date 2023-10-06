const { CustomerModel } = require("../models")
const { customerRepo } = require("../repositories");
const UnAuthorizedError = require("../errors/UnAuthorizedError");
const EntityNotFoundError = require("../errors/entity_not_found");
const EntityNotValidError = require("../errors/entity_not_valid");

const findAll = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new UnAuthorizedError()
        }
        const customers = await customerRepo.findAll();
        res.status(200).send({ message: "customers retrieved successfully", data: customers })
    } catch (error) {
        next(error)
    }
}

const findById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const customer = await customerRepo.findById(id);
        if (!customer) {
            throw new EntityNotFoundError();
        }
        res.status(200).send(customer)
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await customerRepo.deleteById(id);
        res.status(200).send({ message: "customer deleted successfully" })
    } catch (error) {
        const err = new Error("error happened while deleting customer")
        err.status = 500;
        next(err)
    }
}
const updateCustomer = async (req, res, next) => {
    const id = req.params.id;
    const newCustomer = req.body;
    try {
        const customer = await customerRepo.findById(id);
        if (!customer) {
            throw new EntityNotFoundError();
        }
        const updatedUser = await customerRepo.update(id, newCustomer);
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
        const customer = await customerRepo.findById(id);
        if (!customer) {
            throw new EntityNotFoundError();
        }
        let cart = await customerRepo.findCart();

        res.status(200).send({ message: "cart retrieved successfully", cart: cart });

    } catch (error) {
        next(error)
    }

}
const createCustomer = async (customer) => {
    try {
        const customer = customerRepo.findByEmail(email);
        if (customer) {
            throw new Error("Customer with this email already exist")
        }
        const created_customer = await customerRepo.create(customer);
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