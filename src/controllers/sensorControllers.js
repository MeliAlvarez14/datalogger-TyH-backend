const { Sensor, Usuario } = require("../db/pg/models");

const obtenerSensoresUsuario = async (req, res) => {
  try {
    const { userId } = req.params; 
    const usuario = await Usuario.findByPk(userId, {
      include: { model: Sensor, as: "SensoresVisibles" },
    });

    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const data = usuario.SensoresVisibles.map((s) => ({
        id: s.idDevice,
        lab: s.laboratorio
    }))

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener sensores visibles" });
  }
};

const registrarSensor = async (req, res) => {
  try {
    const { userId } = req.params;
    const { idDevice, laboratorio } = req.body; 

    const [sensor] = await Sensor.findOrCreate({
      where: { idDevice },
      defaults: { laboratorio },
    });

    const usuario = await Usuario.findByPk(userId);
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    await usuario.addSensoresVisibles(sensor);
    res.json({ message: "Sensor registrado correctamente", sensor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar sensor" });
  }
};

const eliminarSensoresUsuario = async (req, res) => {
    try {
    const { userId, sensorId } = req.params;

    const usuario = await Usuario.findByPk(userId);
    const sensor = await Sensor.findOne({ where: { idDevice: sensorId } });

    if (!usuario || !sensor) {
      return res.status(404).json({ message: "Usuario o Sensor no encontrado" });
    }
    await usuario.removeSensoresVisibles(sensor);

    res.json({ message: "Sensor desvinculado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al desvincular el sensor" });
  }
};

module.exports = {
  obtenerSensoresUsuario,
  registrarSensor,
  eliminarSensoresUsuario
};
