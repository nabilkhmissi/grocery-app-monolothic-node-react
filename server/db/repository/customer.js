
const { CustomerModel } = require("../models");

const findAllCustomers = async () => {
    const customers = await CustomerModel.find({});
    return customers
}

const createCustomer = async ({ name, email, hashedPassword }) => {
    const customer = new CustomerModel({ name, email, hashedPassword }).save();
    return customer;
}

const findById = async (id) => {
    const customer = await CustomerModel.findById(id);
    return customer;
}

const findByEmail = async (email) => {
    const customer = await CustomerModel.findOne({ email: email });
    return customer;
}

const findWishlistByCustomer = async (id) => {
    const customer = await CustomerModel.findById(id).populate("wishlist");
    if (customer) {
        return customer.wishlist;
    }
    return null;
}




const addToWishlist = async (customerId, product) => {
    const customer = await CustomerModel.findById(customerId).populate("wishlist");
    if (customer) {
        let wishlist = customer.wishlist;
        let exist = false;
        wishlist.map(el => {
            if (el._id.toString() === product._id.toString()) {
                const index = wishlist.indexOf(el);
                wishlist.splice(index, 1)
                exist = true;
            }
        })

        if (!exist) {
            wishlist.push(product)
        };

        customer.wishlist = wishlist;
        const updatedUser = customer.save();
        return updatedUser.wishlist;
    }
}


const findCart = async (customerId) => {
    const customer = await CustomerModel.findById(customerId).populate("cart");
    if (customer) {
        return customer.cart;
    }
}

const addToCart = async (customerId, cartItem, action) => {
    const customer = await CustomerModel.findById(customerId).populate("cart");
    if (customer) {
        const cart = customer.cart;

        console.log(cart)
        updatedCart = addToCartUtility(cartItem, cart, action)
        console.log(updatedCart)

        customer.cart = updatedCart;
        const updatedCustomer = customer.save()
        return updatedCustomer.cart;
    }
}

function addToCartUtility(cartItem, cart, action) {
    let index;
    let exist = false;
    cart.map(el => {
        if (el.product._id.toString() === cartItem.product._id.toString()) {
            exist = true;
            if (action === "remove") {
                cart.splice(cart.indexOf(el), 1)
            } else {
                el.unit = cartItem.unit
            }
        }
    })

    if (!exist) {
        cart.push(cartItem)
    }
    return cart;
}


module.exports = {
    findAllCustomers,
    findById,
    findByEmail,
    createCustomer,
    addToWishlist,
    findWishlistByCustomer,
    findCart,
    addToCart,
}