const jwt = require("jsonwebtoken")

const generate_signature = (payload) => {
    const signature = jwt.sign(payload, 'JWT_SECRET', { expiresIn: "1d" });
    return signature;
}

const validate_token = async (token) => {
    try {
        const isValid = jwt.verify(token, 'JWT_SECRET');
        return isValid ? true : false
    } catch (error) {
        throw new Error("error happened")
    }
}

const decodeToken = (token) => {
    return jwt.decode(token)
}

module.exports = {
    generate_signature,
    validate_token,
    decodeToken
}