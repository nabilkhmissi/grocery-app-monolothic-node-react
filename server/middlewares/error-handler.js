module.exports = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message
    res.status(500).send({ status, message })
}