const router = require("express").Router();
const { productController } = require("../controllers")

router.get("", productController.findAll)
router.post("", productController.create)
router.put("/:id", productController.update)
router.get("/:id", productController.findById);
router.delete("/:id", productController.deleteById);


module.exports = router