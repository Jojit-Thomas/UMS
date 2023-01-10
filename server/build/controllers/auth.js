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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const student_1 = __importDefault(require("../services/student"));
const http_errors_1 = __importDefault(require("http-errors"));
const redis_1 = require("../config/redis");
const college_1 = __importDefault(require("../services/college"));
const teacher_1 = __importDefault(require("../services/teacher"));
const client = (0, redis_1.connectRedis)();
const signRefreshToken = (payload) => {
};
const studentLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw http_errors_1.default.BadRequest("Email and Password is required");
        let user = yield student_1.default.fetchAStudentDetails(email);
        let isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            throw http_errors_1.default.Unauthorized("Email or Password is wrong");
        if (user.isBlocked)
            throw http_errors_1.default.Unauthorized("You are blocked by the admin");
        let accessToken = jsonwebtoken_1.default.sign({ name: user.name, course: user.course, classId: user.classId, id: user._id }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "24h", audience: user.email });
        let refreshToken = jsonwebtoken_1.default.sign({ name: user.name, course: user.course, classId: user.classId, id: user._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "180d", audience: user.email });
        client.SET(user.email, refreshToken, { EX: 180 * 24 * 60 * 60 });
        res.status(200).json({ accessToken, refreshToken, user: { name: user.name, classId: user.classId, email: user.email, id: user._id } });
    }
    catch (err) {
        if (err.status >= 400 && err.status < 500) {
            res.status(err.status).json(err.message);
        }
        else
            next(err);
    }
});
const collegeLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collegeId, password } = req.body;
        if (!collegeId || !password)
            throw http_errors_1.default.BadRequest("College Id and Password is required");
        let college = yield college_1.default.fetchACollege(req.body.collegeId);
        let isPasswordValid = yield bcrypt_1.default.compare(password, college.password);
        if (!isPasswordValid)
            throw http_errors_1.default.Unauthorized("College Id or Password is wrong");
        let accessToken = jsonwebtoken_1.default.sign({}, process.env.JWT_COLLEGE_ACCESS_TOKEN, { expiresIn: "24h", audience: college.collegeId });
        res.status(200).json({ accessToken });
    }
    catch (err) {
        if (err.status >= 400 && err.status < 500) {
            res.status(err.status).json(err.message);
        }
        else
            next(err);
    }
});
const teacherLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            throw http_errors_1.default.BadRequest("Email and Password is required");
        console.log(email, password);
        let teacher = yield teacher_1.default.fetchATeacher(email);
        console.log(teacher);
        let isPasswordValid = yield bcrypt_1.default.compare(password, teacher.password);
        if (!isPasswordValid)
            throw http_errors_1.default.Unauthorized("Email or Password is wrong");
        let accessToken = jsonwebtoken_1.default.sign({ collegeId: teacher.collegeId, name: teacher.name, id: teacher._id }, process.env.JWT_TEACHER_ACCESS_TOKEN, { expiresIn: "24h", audience: teacher.email });
        res.status(200).json({ accessToken, user: { name: teacher.name, collegeId: teacher.collegeId, email: teacher.email, id: teacher._id } });
    }
    catch (err) {
        if (err.status >= 400 && err.status < 500) {
            res.status(err.status).json(err.message);
        }
        else
            next(err);
    }
});
const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.refreshToken || req.body.refreshToken === null)
            throw ({ status: 401, message: "Unauthorized" });
        let { refreshToken } = req.body;
        let user = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        console.log("user : ", user);
        let refreshTokenDb = yield client.GET(user.aud);
        console.log("refresh token : ", refreshTokenDb);
        // if  (refreshTokenDb === null) throw createHttpError.Unauthorized()
        if (refreshTokenDb === refreshToken) {
            let accessToken = jsonwebtoken_1.default.sign({ name: user.name }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "24h", audience: user.aud });
            let refreshToken = jsonwebtoken_1.default.sign({ name: user.name }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "180d", audience: user.aud });
            client.SET(user.aud, refreshToken, { EX: 180 * 24 * 60 * 60 });
            res.status(200).json({ accessToken, refreshToken });
        }
        else {
            // (async () => await client.DEL(user.aud))()
            res.status(401).json("Unauthorized");
        }
    }
    catch (err) {
        console.table(err);
        if (err.name === "JsonWebTokenError") {
            res.status(401).json("Unauthroized");
        }
        else {
            res.status(500).json("Internal Server Error");
        }
    }
});
const logout = (req, res) => {
    try {
        if (!req.body.refreshToken)
            throw ({ status: 401, message: "Unauthorized" });
        const { refreshToken } = req.body;
        let verifyRefreshToken = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);
        (() => __awaiter(void 0, void 0, void 0, function* () { return yield client.DEL(verifyRefreshToken.aud); }))();
        res.sendStatus(204);
    }
    catch (err) {
        console.table(err);
    }
};
const universityLogin = (req, res) => {
    try {
        if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
            const adminAccessToken = jsonwebtoken_1.default.sign({}, process.env.JWT_ADMIN_ACCESS_TOKEN, { expiresIn: "24h" });
            res.status(200).json({ adminAccessToken: adminAccessToken });
        }
        else {
            res.status(401).json("Email or Password is wrong");
        }
    }
    catch (err) {
        res.status(err.status || 500).json("Internal Server Error");
    }
};
exports.default = { studentLogin, refreshAccessToken, logout, universityLogin, collegeLogin, teacherLogin };
