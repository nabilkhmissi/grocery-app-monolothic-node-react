const express = require("express");
const app = express();
require("./db/DBconnect")
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler")

const { customerRoute, productRoute, authRoute } = require("./routes")
const authCheck = require("./middlewares/auth")

app.use(express.json());
app.use(cors());


app.use("/customer", authCheck, customerRoute);
app.use("/products", productRoute);
app.use("/auth", authRoute);
app.use(errorHandler)

app.listen(3000, () => {
    console.clear();
    console.log("app is listening on port 3000")
})