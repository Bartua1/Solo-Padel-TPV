const express = require("express");
const router = express.Router();

const clientproduct = require("../controllers/clientproducts.controller");

router.get("/", clientproduct.getClientsProducts);

router.post("/", clientproduct.createClientProducts);

router.get("/:client", clientproduct.getClientProducts);

router.get("/:client/:product", clientproduct.getClientProductsByProduct);

router.put("/:id", clientproduct.editClientProducts);

router.delete("/:id", clientproduct.deleteClientProducts);

module.exports = router;