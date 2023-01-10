#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('../app');
// var debug = require('debug')('server:server');
const debug_1 = __importDefault(require("debug"));
// var http = require('http');
const http_1 = __importDefault(require("http"));
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    requiredVariables();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    (0, debug_1.default)('Listening on ' + bind);
}
function requiredVariables() {
    if (!process.env.JWT_ACCESS_TOKEN)
        throw new Error("JWT_ACCESS_TOKEN is not provided in env");
    if (!process.env.JWT_REFRESH_TOKEN)
        throw new Error("JWT_REFRESH_TOKEN is not provided in env");
    if (!process.env.JWT_ADMIN_ACCESS_TOKEN)
        throw new Error("JWT_ADMIN_ACCESS_TOKEN is not provided in env");
    if (!process.env.JWT_COLLEGE_ACCESS_TOKEN)
        throw new Error("JWT_COLLEGE_ACCESS_TOKEN is not provided in env");
    if (!process.env.JWT_TEACHER_ACCESS_TOKEN)
        throw new Error("JWT_TEACHER_ACCESS_TOKEN is not provided in env");
}
