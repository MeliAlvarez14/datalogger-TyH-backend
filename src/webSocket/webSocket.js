const WebSocket = require("ws");

const iniciarWs = (servidor) => {
    const wss = new WebSocket.Server({ server: servidor });

    wss.on("connection", (ws) => {
    console.log("Cliente WebSocket conectado");

    ws.on("close", () => {
        console.log("Cliente desconectado");
        })
    })

    return wss;
};

module.exports = iniciarWs;