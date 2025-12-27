const { Router } = require("express");
const router = Router();
const { sensorControllers } = require("../controllers");

router.get("/usuario/:userId", sensorControllers.obtenerSensoresUsuario);
router.post("/registrar/:userId", sensorControllers.registrarSensor);
router.delete("/usuario/:userId/:sensorId", sensorControllers.eliminarSensoresUsuario);

module.exports = router;
