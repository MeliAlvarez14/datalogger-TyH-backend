const { Router } = require("express");
const router = Router();
const { usuarioControllers } = require("../controllers");

router.get("/:id", usuarioControllers.getUsuarioPorId);

router.post("/login", usuarioControllers.loguearUsuario);

router.post("/registro", usuarioControllers.registrarUsuario);

router.post("/cambiarContrasenia", usuarioControllers.cambiarContrasenia);

module.exports = router;