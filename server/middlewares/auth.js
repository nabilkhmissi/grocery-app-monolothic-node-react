const { CustomerModel } = require("../models");
const { validate_token, decodeToken } = require("../utility/jwt");

module.exports = async function authCheck(req, res, next) {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            throw new Error("jwt token nout found")
        }
        const jwt = authorization.split(' ')[1];

        const isTokenValid = validate_token(jwt);
        if (!isTokenValid) {
            throw new Error("jwt not valid")
        }

        const payload = decodeToken(jwt);
        const user = await CustomerModel.findOne({ email: payload.email });
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}

