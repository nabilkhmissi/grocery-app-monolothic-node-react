const { generate_signature } = require("../utility/jwt")
const password_utility = require("../utility/password-utility");
const { CustomerModel } = require("../models")

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const customer = await CustomerModel.findOne({ email: email });
        if (!customer) {
            throw new Error("Customer with this email not found")
        }

        const validatePassword = await password_utility.validatePassword(password, customer.password, customer.salt);
        if (!validatePassword) {
            throw new Error("Invalid creadentials")
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
        throw new Error("Invalid creadentials")
    }

    const existCustomer = await CustomerModel.findOne({ email });
    if (existCustomer) {
        throw new Error("Invalid credentials")
    }
    const salt = await password_utility.genSalt();
    const userPassword = await password_utility.hashPassword(password, salt)

    const new_customer = await customerRepo.create({
        name,
        email,
        password: userPassword,
        salt: salt
    });
    res.status(200).send(new_customer)
}


module.exports = { login, signup }