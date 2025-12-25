require('dotenv').config();
const EXPRESS = require("express");
const HTTP = require("http");
const APP = EXPRESS();
const PORT = process.env.PORT || 3000;
const SERVIDOR = HTTP.createServer(APP);
const clienteMqtt = require("./mqtt/mqttClient");
const iniciarWs = require("./webSocket/webSocket");
const wss = iniciarWs(SERVIDOR);
const persistirMedicion = require("./db/configuracionDB");

APP.use(EXPRESS.json());

SERVIDOR.listen(PORT, () => {
    console.log(`Backend y WebSockets corriendo en el puerto ${PORT}`);
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
        console.error("Error al procesar mensaje", err.mensaje);
    }
});
