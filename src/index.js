require('dotenv').config();
const express = require("express");
const APP = express();
const PORT = process.env.PORT || 3000;
const clienteMqtt = require("./mqtt/mqttClient");
const wss = require("./webSocket/webSocket");
const persistirMedicion = require("./db/configuracionDB");

APP.use(express.json());

APP.listen(PORT, () => {
    console.log(`Backend y WebSockets corriendo en el puerto ${PORT}`);
});

clienteMqtt.on("message", (topico, mensaje) => {
    const payload = mensaje.toString();
    const objetoPayload = JSON.parse(payload);
    console.log(`Publicación de ${topico}: ${payload}`);

    persistirMedicion(objetoPayload);

    wss.clients.forEach((cliente) => {
        if(cliente.readyState === 1) {
            cliente.send(payload);
        }
    });
});
