const express = require("express");
const APP = express();
const PORT = process.env.PORT || 3000;
const clienteMqtt = require("./mqtt/mqttClient");
const wss = require("./webSocket/webSocket");

APP.use(express.json());

APP.listen(PORT, () => {
    console.log(`Backend y WebSockets corriendo en el puerto ${PORT}`);
});


clienteMqtt.on("message", (topico, mensaje) => {
    const payload = mensaje.toString();
    console.log(`Publicación de ${topico}: ${payload}`);

    wss.clients.forEach((cliente) => {
        if(cliente.readyState === 1) {
            cliente.send(payload);
        }
    });
});
