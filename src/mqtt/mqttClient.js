const MQTT = require("mqtt");
const MQTTURL = `mqtt://test.mosquitto.org`;

const cliente = MQTT.connect(MQTTURL);

cliente.on("connect", () => {
    cliente.subscribe(`INTI-DTMA/Labs/Mediciones`, (err) => {
        if(!err) {
            console.log("Se suscribió al tópico correctamente");
        }
    });
})

module.exports = cliente;