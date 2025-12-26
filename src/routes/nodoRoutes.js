const { Router } = require("express");
const router = Router();
const { nodoControllers } = require("../controllers");

router.get("/:id/historial", nodoControllers.getHistorialNodo);

module.exports = router;