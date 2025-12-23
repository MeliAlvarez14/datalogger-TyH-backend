const MQTT = require("mqtt");
const express = require("express");
const APP = express();
const PORT = process.env.PORT || 1883;
const MQTTURL =  process.env.MQTTURL || `ws://localhost:${PORT}`;

APP.use(express.json());
APP.listen(PORT, async () => {
    console.log(`App corriendo en el puerto ${PORT}`);
});

const cliente = MQTT.connect(MQTTURL);
cliente.on("connect", () => {
    cliente.subscribe("INTI-DTMA/Lab/Corrosion", (err) => {
        if(!err) {
            console.log("Se suscribió al tópico correctamente");
        } else {
            console.log("Error al suscribirse al tópico.");
        }
    })
})

cliente.on("message", (topico, mensaje) => {
    console.log("Publicación de:", topico);
    console.log(mensaje.toString());
    //cliente.end();
});