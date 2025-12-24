const MQTT = require("mqtt");
const MQTTURL = `mqtt://${process.env.MQTTURL}`; 

const cliente = MQTT.connect(MQTTURL);

cliente.on("connect", () => {
    cliente.subscribe("INTI-DTMA/Lab/Corrosion", (err) => {
        if(!err) {
            console.log("Se suscribió al tópico correctamente");
        }
    });
})

module.exports = cliente;