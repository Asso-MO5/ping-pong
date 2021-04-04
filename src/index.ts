import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";

import { createServer } from "http";
import { Server } from "socket.io";

const
    {PORT} = process.env,
    port = PORT || 3900,
    app = new Koa(),
    router = new Router(),
    httpServer = createServer(),
    io = new Server(httpServer,{
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

httpServer.listen(3905);

// Middlewares
app.use(json());
app.use(cors({"Access-Control-Allow-Origin": "*"}));
app.use(logger());
app.use(bodyParser());

// Routes
router.post("/room/:room", async (ctx, next) => {
  const {room} = ctx.params;
  io.emit(room,ctx.request.body)
  ctx.body = {res: "pong"}
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`🐨 run on port ${port}`);
    console.log(`🏓 run on port ${3905}`);
});