require('dotenv').config();
const EXPRESS = require("express");
const HTTP = require("http");
const CORS = require("cors");
const BODYPARSER = require("body-parser");
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const SERVIDOR = HTTP.createServer(APP);
const DB = require('./db/pg/models');
const clienteMqtt = require("./mqtt/mqttClient");
const iniciarWs = require("./webSocket/webSocket");
const wss = iniciarWs(SERVIDOR);
const { persistirMedicion } = require("./db/configuracionDB");
const { nodoRoutes, usuarioRoutes } = require("./routes");

APP.use(EXPRESS.json());
APP.use(BODYPARSER.json());
APP.use(CORS());
APP.use("/api/nodos", nodoRoutes);
APP.use("/api/usuarios", usuarioRoutes);

SERVIDOR.listen(PORT, async () => {
    console.log(`Backend y WebSockets corriendo en el puerto ${PORT}`);
    await DB.sequelize.sync(
    //{force: true}
  );
});

clienteMqtt.on("message", (topico, mensaje) => {
    try {
        const payload = mensaje.toString();
        const objetoPayload = JSON.parse(payload);
        console.log(`Publicación de ${topico}: ${payload}`);

        persistirMedicion(objetoPayload);

        wss.clients.forEach((cliente) => {
            if(cliente.readyState === 1) {
                cliente.send(payload);
            }
        });
    } catch (err) {
        console.error("Error al procesar mensaje", err.message);
    }
});
