const { obtenerHistorial } = require("../db/configuracionDB");

const getHistorialNodo = async(req, res) => {
    const { id } = req.params;
    const { rango, start, stop } = req.query;

    try {
        let datos;

        if (start && stop) {
            datos = await obtenerHistorial(id, { start, stop });
        } else {
            const datos = await obtenerHistorial(id, rango);
        }
        res.json(datos);
        console.log("accediendo a historial", datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar InfluxDB' });
    }
};

module.exports = { getHistorialNodo };