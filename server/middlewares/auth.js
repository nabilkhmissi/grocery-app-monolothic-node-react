const { validate_token } = require("../utility/jwt")

module.exports = function authCheck(req, res, next) {
    const signature = req.headers['authorization'];
    const jwt = signature.split(' ')[1];
    if (!jwt) {
        const err = new Error("JWT is missing");
        err.status = 401
        next(err)
    }

    const isTokenValid = validate_token(jwt);
    if (!isTokenValid) {
        const err = new Error("JWT is missing");
        err.status = 401
        next(err)
    }

    next()
}

