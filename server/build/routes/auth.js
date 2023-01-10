"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require("express");
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
// const Auth = require("../controllers/auth");
const auth_1 = __importDefault(require("../controllers/auth"));
/* GET users listing. */
router.post("/student/access/refresh", auth_1.default.refreshAccessToken);
router.post("/student/login", auth_1.default.studentLogin);
router.post("/teacher/login", auth_1.default.teacherLogin);
router.delete("/student/logout", auth_1.default.logout);
router.post("/university/login", auth_1.default.universityLogin);
router.post("/college/login", auth_1.default.collegeLogin);
exports.default = router;
