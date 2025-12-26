const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = "tokenDePruebaSecreto";

const getUsuarioPorId = async(req, res) => {};

const loguearUsuario = async(req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    res.json({ user: { nombre: user.nombre, apellido: user.apellido, email }, token });
};

const registrarUsuario = async(req, res) => {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = { nombre, apellido, email, password: hashed };
    users.push(newUser);

    const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
    res.json({ user: { nombre, apellido, email }, token });
};

const cambiarContrasenia = async(req, res) => {
    
    const { currentPassword, newPassword } = req.body;
    const user = users.find(u => u.email === req.user.email);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    user.password = await bcrypt.hash(newPassword, 10);
    res.json({ message: "Contraseña actualizada" });

};

module.exports = { getUsuarioPorId, loguearUsuario, registrarUsuario, cambiarContrasenia };