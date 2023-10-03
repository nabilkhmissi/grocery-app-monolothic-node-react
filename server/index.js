const express = require("express");
const app = express();
require("./db/connect")
const startServer = require("./api")
const cors = require("cors")

app.use(express.json());
app.use(cors());

startServer(app);

app.listen(3000, () => {
    console.log("app is listening on port 3000")
})