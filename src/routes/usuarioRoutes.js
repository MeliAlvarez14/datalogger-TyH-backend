const { Router } = require("express");
const router = Router();
const { usuarioControllers } = require("../controllers");
const authMiddleware = require("../middlewares/authMiddlewares");

router.get("/:id", usuarioControllers.getUsuarioPorId);

router.post("/login", usuarioControllers.loguearUsuario);

router.post("/registro", usuarioControllers.registrarUsuario);

router.post("/cambiarContrasenia", authMiddleware, usuarioControllers.cambiarContrasenia);

module.exports = router;