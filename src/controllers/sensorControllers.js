const { UsuarioSensor, Sensor, Usuario } = require("../db/pg/models");

const obtenerSensoresUsuario = async (req, res) => {
  try {
    const { userId } = req.params; 
    const usuario = await Usuario.findByPk(userId, {
      include: { model: Sensor, as: "sensoresVisibles" },
    });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({
      sensoresVisibles: usuario.sensoresVisibles.map((s) => ({ id: s.id, lab: s.lab })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener sensores visibles" });
  }
};

const registrarSensor = async (req, res) => {
  try {
    const { userId } = req.params;
    const { id, lab } = req.body; 

    const [sensor] = await Sensor.findOrCreate({
      where: { id },
      defaults: { lab },
    });

    const usuario = await Usuario.findByPk(userId);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.addSensoresVisibles(sensor);
    res.json({ message: "Sensor registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar sensor" });
  }
};

const eliminarSensoresUsuario = async () => {
    try {
    const { userId, sensorId } = req.params;

    const registro = await UsuarioSensor.findOne({
      where: { userId, sensorId },
    });

    if (!registro) return res.status(404).json({ message: "Sensor no encontrado para este usuario" });

    await registro.destroy();
    res.json({ message: "Sensor eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el sensor" });
  }
};

module.exports = {
  obtenerSensoresUsuario,
  registrarSensor,
  eliminarSensoresUsuario
};
