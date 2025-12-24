const WebSocket = require("ws");
const wss = new WebSocket.Server({ port:8080 });

wss.on("connection", (ws) => {
    console.log("Cliente WebSocket conectado");

    ws.on("close", () => {
        console.log("Cliente desconectado");
    })
})

module.exports = wss;