"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = void 0;
const redis_1 = require("redis");
const connectRedis = () => {
    const client = (0, redis_1.createClient)({ socket: {
            port: 6379,
            host: "127.0.0.1"
        } });
    (() => __awaiter(void 0, void 0, void 0, function* () { return yield client.connect(); }))();
    client.on("connect", () => {
        console.log("Client connnected to redis...");
    });
    client.on("ready", () => {
        console.log("Client connnected to redis and ready to use...");
    });
    client.on("error", (err) => {
        console.log("``` Redis Error : ", err.message, "```");
    });
    client.on("end", () => {
        console.log("Client discconected from redis!!!");
    });
    return client;
};
exports.connectRedis = connectRedis;
// import { createClient } from "redis";
// const state = {
//   client: null
// }
// export const connectRedis = ()=>{
//   state.client = createClient({socket : {
//     port: 6379,
//     host : "127.0.0.1"
//   }});
//   (async () => await state.client.connect())()
//   state.client.on("connect", () => {
//     console.log("Client connnected to redis...")
//   })
//   state.client.on("ready", () => {
//     console.log("Client connnected to redis and ready to use...")
//   }) 
//   state.client.on("error", (err) => {
//     console.log("``` Redis Error : ", err.message, "```")
//   })
//   state.client.on("end", () => {
//     console.log("Client discconected from redis!!!")
//   })
//   // return client
// }
// export const getClient = () => {
//   if(!state.client) throw new Error("Error with redis")
//   return state.client
// }
