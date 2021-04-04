"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const URL = "http://localhost:3005";
const socket = socket_io_client_1.io(URL, { autoConnect: false });
exports.default = socket;
