class UnAuthorizedError extends Error{
    constructor(message) {
        super(message);
        this.message = message ?? "You are not authoriaed to access this page"
        this.status = 403
    }
}

module.exports = { UnAuthorizedError }