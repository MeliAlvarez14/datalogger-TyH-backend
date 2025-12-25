const MQTT = require("mqtt");
const MQTTURL = `mqtt://test.mosquitto.org`; 
const LABORATORIO = process.env.LABORATORIO;

const cliente = MQTT.connect(MQTTURL);

cliente.on("connect", () => {
    cliente.subscribe(`INTI-DTMA/Lab/${LABORATORIO}`, (err) => {
        if(!err) {
            console.log("Se suscribió al tópico correctamente");
        }
    });
})

module.exports = cliente;