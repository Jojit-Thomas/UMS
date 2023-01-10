"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const redis_1 = require("../config/redis");
const http_errors_1 = __importDefault(require("http-errors"));
const client = (0, redis_1.connectRedis)();
const verifyStudent = (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw ({ status: 401, message: "Unauthorized" });
        const accessToken = req.headers.authorization;
        console.log(accessToken);
        const user = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_TOKEN);
        console.log("```user``` : ", user);
        req.user = user;
        next();
    }
    catch (e) {
        console.table(e);
        const err = ['TokenExpiredError', 'JsonWebTokenError'];
        if (err.includes(e.name)) {
            res.status(401).json(e);
        }
        else {
            res.status(e.status || 500).json(e.message);
        }
    }
};
const verifyUniversity = (req, res, next) => {
    try {
        console.log("hey");
        const accessToken = req.headers.authorization;
        if (!accessToken)
            throw ({ status: 401, message: "Unauthorized" });
        const user = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ADMIN_ACCESS_TOKEN);
        console.log("```user``` : ", user);
        req.universtiy = user;
        next();
    }
    catch (e) {
        console.table(e);
        if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
            res.status(401).json(e);
            try {
            }
            catch (err) {
            }
        }
        else {
            res.status(e.status || 500).json(e.message);
        }
    }
};
const verifyCollege = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken)
            throw http_errors_1.default.BadRequest("ACCESS_TOKEN_NOTFOUND");
        const college = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_COLLEGE_ACCESS_TOKEN);
        console.log("```college``` : ", college);
        req.college = college;
        next();
    }
    catch (e) {
        console.table(e);
        if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
            res.status(401).json(e);
        }
        else {
            res.status(e.status || 500).json(e.message);
        }
    }
};
const verifyTeacher = (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (!accessToken)
            throw http_errors_1.default.BadRequest("ACCESS_TOKEN_NOTFOUND");
        const user = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_TEACHER_ACCESS_TOKEN);
        console.log("```user``` : ", user);
        req.teacher = user;
        next();
    }
    catch (e) {
        console.table(e);
        if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
            res.status(401).json(e);
        }
        else {
            res.status(e.status || 500).json(e.message);
        }
    }
};
exports.default = { verifyStudent, verifyUniversity, verifyCollege, verifyTeacher };
