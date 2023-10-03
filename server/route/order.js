const router = require('express').Router()


router.get("", (req, res) => {
    res.send("response from order router")
})


module.exports = router