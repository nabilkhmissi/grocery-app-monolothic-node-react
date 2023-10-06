const { validate_token, decodeToken } = require("../utility/jwt");
const { customerController } = require("../controllers")

module.exports = async function authCheck(req, res, next) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
        const err = new Error("JWT is missing");
        err.status = 401
        next(err);
        return;
    }
    const jwt = authorization.split(' ')[1];

    const isTokenValid = validate_token(jwt);
    if (!isTokenValid) {
        const err = new Error("JWT is missing or not valid");
        err.status = 401
        next(err)
    }

    const payload = decodeToken(jwt);
    const user = await customerController.findByEmail(payload.email);
    req.user = user;

    next()
}

