const router = require("express").Router();
const { customerController } = require("../controllers")

router.get("", customerController.findAll)
router.post("", customerController.createCustomer)
router.put("/:id", customerController.updateCustomer)
router.get("/:id", customerController.findById);
router.delete("/:id", customerController.deleteById);


module.exports = router