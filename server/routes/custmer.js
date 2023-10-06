const router = require("express").Router();
const { customerController } = require("../controllers")

/* router.post("/login", customerController.login) */
router.get("", customerController.findAll)
router.put("/:id", customerController.updateCustomer)
router.get("/:id", customerController.findById);
router.delete("/:id", customerController.deleteById);
router.get("/:id/cart", customerController.findCart);
router.post("/cart", customerController.addToCart);
router.get("/:id/orders", customerController.findOrders);


module.exports = router