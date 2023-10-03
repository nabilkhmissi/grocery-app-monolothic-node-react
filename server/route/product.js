const router = require("express").Router()
const { productRepo } = require("../db/repository")
const data = require("../db/data")

router.get("", (req, res) => {
    res.status(200).send({ data: data })
})
router.post("", async (req, res) => {
    const { name, desc, unit, price, supplier } = req.body;
    const product = await productRepo.saveProduct({ name, desc, unit, price, supplier });
    res.send({ message: "product added successfully", data: product })
})

router.get("/:id", async (req, res) => {
    const product = await productRepo.findById(req.params.id);
    if (!product) {
        res.status(500).send({ message: "product not found" });
        return;
    }
    res.status(200).send({ message: "product retrieved successfully", data: product })
})

router.delete("/:id", async (req, res) => {
    const product = await productRepo.deleteById(req.params.id);
    if (!product) {
        res.status(500).send({ message: "product not found" })
        return;
    }
    res.status(200).send({ message: "product deleted successfully" })
})


router.put("/:id", async (req, res) => {
    const { old } = req.body;

    const product = await productRepo.update(req.params.id, old);

    res.status(200).send({ message: "product updated successfully" })
})


module.exports = router;