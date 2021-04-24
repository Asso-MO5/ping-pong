import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import * as cors from "@koa/cors";

import { createServer } from "http";
import { Server } from "socket.io";
import { registerApp } from './registerApp';

const
    {PORT} = process.env,
    port = PORT || 3900,
    app = new Koa(),
    router = new Router(),
    httpServer = createServer(),
    io = new Server(httpServer,{cors: {origin: "*"}});

httpServer.listen(3905);

// Middlewares
app.use(json());
app.use(cors({"Access-Control-Allow-Origin": "*"}));
app.use(logger());
app.use(bodyParser());

// Routes
router.get("/", async (ctx, next) => {
  ctx.body = "Ping Pong is online !"
});

router.post("/room", async (ctx, next) => {
  const 
    {room, message} = ctx.request.body,
    isProtectRoom  = registerApp.find((it:registerApp) => room.includes(it.prefix));

    if(isProtectRoom){
      const canAccess : registerApp | undefined = registerApp
        .find((it:registerApp) => 
          it.key === ctx.request.header.authorization.replace('Bearer ','') 
        );
      if(canAccess){
        io.emit(room,message);
      }else {
        ctx.status = 403;
        ctx.body = "interdit";
      }
    } else {
      io.emit(room,message);
    }
  ctx.body = {res: "pong"}
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`🐨 run on port ${port}`);
    console.log(`🏓 run on port ${3905}`);
});