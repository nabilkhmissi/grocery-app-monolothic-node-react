const router = require('express').Router()
const { customerRepo } = require("../db/repository");
const bcrypt = require("bcrypt")



router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const customer = await customerRepo.findByEmail(email);
    if (customer) {
        res.status(500).send({ message: "this email is already in use" });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await customerRepo.createCustomer({ name, email, hashedPassword });
    res.status(200).send({ message: "customer created succssfully", data: newCustomer })

});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const customer = await customerRepo.findByEmail(email);
    if (!customer) {
        res.status(500).send({ message: "no user found with this email" });
        return;
    }
    const samePassword = bcrypt.compare(password, customer.hashedPassword);
    if (!samePassword) {
        res.status(500).send({ message: "Bad credentials" });
        return;
    }
    res.status(200).send({ message: "customer created succssfully", data: customer })
});


router.get("", async (req, res) => {
    const customers = await customerRepo.findAllCustomers();
    console.log(customers)
    res.send({ data: customers, message: "retrieved successfully" })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const customer = await customerRepo.findById(id);
    res.status(200).send({ message: "customer retrieved succssfully", data: customer })

})

router.post("/wishlist", async (req, res) => {
    const { customerId, product } = req.body;

    const wishlist = await customerRepo.addToWishlist(customerId, product);
    res.send({ message: "wishlist updated successfully !", data: wishlist })

})


router.get("/:id/wishlist", async (req, res) => {
    const id = req.params.id;

    const wishlist = await customerRepo.findWishlistByCustomer(id);
    res.send({ message: "wishlist retrieved successfully !", data: wishlist })

})

router.get("/:id/cart", async (req, res) => {
    const id = req.params.id;

    const cart = await customerRepo.findCart(id);
    res.send({ message: "cart retrieved successfully !", data: cart })

})


router.post("/cart", async (req, res) => {
    const { customerId, cartItem, action } = req.body;

    const cart = await customerRepo.addToCart(customerId, cartItem, action);
    res.send({ message: "cart updated successfully !", data: cart })

})

module.exports = router;