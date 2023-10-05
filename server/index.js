const express = require("express");
const app = express();
require("./db/DBconnect")
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler")

const { customerRoute } = require("./routes")

app.use(express.json());
app.use(cors());


app.use("/customer", customerRoute)
app.use(errorHandler)

app.listen(3000, () => {
    console.clear();
    console.log("app is listening on port 3000")
})