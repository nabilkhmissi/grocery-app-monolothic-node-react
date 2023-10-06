const customerController = require("./customerController")
const { generate_signature } = require("../utility/jwt")
const password_utility = require("../utility/password-utility")

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const customer = await customerController.findByEmail(email);

        const isValidPassword = await password_utility.validatePassword(password, customer.password, customer.salt);
        if (!isValidPassword) {
            res.status(403).send({ message: "invalid credentials" })
            return;
        }
        const { _id, name } = customer;
        const signature = generate_signature({ _id, name, email });

        res.status(200).send({ message: "authenticated succesfully", data: signature })
    } catch (error) {
        next(error)
    }
}

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).send({ message: "invalid details" })
        return;
    }

    const existCustomer = await customerController.findByEmail(email);
    if (existCustomer) {
        res.status(400).send({ message: "this email is already in use" });
        return;
    }
    const salt = await password_utility.genSalt();
    const userPassword = await password_utility.hashPassword(password, salt)

    const new_customer = customerController.createCustomer({
        name,
        email,
        password: userPassword,
        salt: salt
    });
    res.status(200).send(new_customer)
}


module.exports = { login, signup }