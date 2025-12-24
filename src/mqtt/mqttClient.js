const MQTT = require("mqtt");
const MQTTPORT = process.env.MQTTPORT || 1883
const MQTTURL =  process.env.MQTTURL || `mqtt://localhost:${MQTTPORT}`;

const cliente = MQTT.connect(MQTTURL);

cliente.on("connect", () => {
    cliente.subscribe("INTI-DTMA/Lab/Corrosion", (err) => {
        if(!err) {
            console.log("Se suscribió al tópico correctamente");
        }
    });
})

module.exports = cliente;