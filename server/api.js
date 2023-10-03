const { customer, order, product } = require("./route")

module.exports = (app) => {
    app.use("/customer", customer);
    app.use("/order", order);
    app.use("/product", product);
}
