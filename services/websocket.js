//services/websocket.js
const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const GPSData = require("../models/GPSData");

const clients = new Map();

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ 
        server,
        path: "/ws/tracking",
        verifyClient: (info, done) => {
            try{
                const token = info.req.headers["sec-websocket-protocol"];
                jwt.verify(token, secret);
                done(true);
            
            } catch { done(false); }
        }
     });

    wss.on("connection", (ws, req) => {
        console.log("Cliente WebSocket conectado");

        const {regattaId} = new URL(req.url, "http://x").searchParams;
        if (!regattaId) return ws.close();

        if (!clients.has(regattaId)) clients.set(regattaId, new Set());
        clients.get(regattaId).add(ws);

        ws.on("message", async raw => {
            const message = JSON.parse(raw);
            await GPSData.create({regattaId, ...message});
            for (let client of clients.get(regattaId)){
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(raw);
                }
            }
        });

        ws.on("close", () => {
            clients.get(regattaId).delete(ws);
            if (!clients.get(regattaId).size) clients.delete(regattaId);
            console.log("Cliente desconectado");
        });
    });

    return wss;
}

module.exports = { setupWebSocket, clients };
