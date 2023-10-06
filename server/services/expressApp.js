const authCheck = require("../middlewares/auth")
const { customerRoute, productRoute, authRoute } = require("../routes")

module.exports = (app) => {
    app.use("/customer", authCheck, customerRoute);
    app.use("/products", productRoute);
    app.use("/auth", authRoute);
}

