"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
function sendSocket(room, payload) {
    const { URL_PONG } = process.env, socket = socket_io_client_1.io("http://localhost:3005");
    socket.emit(room, payload);
    return "pong";
}
exports.default = sendSocket;
