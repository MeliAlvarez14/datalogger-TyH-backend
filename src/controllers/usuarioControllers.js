const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Usuario } = require("../db/pg/models");
const SECRET = "tokenDePruebaSecreto";

const getUsuarioPorId = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.user.id, {
      attributes: ["id", "nombre", "apellido", "email"],
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

const loguearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user || !user.password) {
        return res.status(400).json({ message: "Usuario no encontrado o sin contraseña" });
    }
    console.log(user.password);


    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "1h",
    });
    res.json({
      user: { nombre: user.nombre, apellido: user.apellido, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const existe = await Usuario.findOne({ where: { email } });
    if (existe)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await Usuario.create({
      nombre,
      apellido,
      email,
      password: hashed,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET, {
      expiresIn: "1h",
    });
    res.json({
      user: {
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

const cambiarContrasenia = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; 

  try {
    const user = await Usuario.findByPk(userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid)
      return res.status(400).json({ message: "Contraseña actual incorrecta" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Contraseña actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al cambiar contraseña" });
  }
};

module.exports = {
  getUsuarioPorId,
  loguearUsuario,
  registrarUsuario,
  cambiarContrasenia,
};
