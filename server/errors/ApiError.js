module.exports = class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}