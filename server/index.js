const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middlewares/error-handler")
const expressApp = require("./services/expressApp")
const connectDB = require("./services/db.service")
const db_init = require("./services/initProducts")

connectDB();
app.use(express.json());
app.use(cors());
expressApp(app)
app.use(errorHandler)
db_init()


app.listen(3000, () => {
    console.clear();
    console.log("app is listening on port 3000")
})