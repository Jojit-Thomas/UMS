"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require('express');
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../controllers/student"));
const auth_1 = __importDefault(require("../middlewares/auth"));
var router = express_1.default.Router();
/* GET home page. */
router.get('/subject/all', auth_1.default.verifyStudent, student_1.default.allSubjects);
router.post('/add', student_1.default.createStudent);
router.post('/admission/apply', student_1.default.createStudentAllotment);
router.post('/admission/pay', student_1.default.admissionPayment);
router.patch('/chat/add', auth_1.default.verifyStudent, student_1.default.newChat);
router.get('/chat/:subject', auth_1.default.verifyStudent, student_1.default.getAllChats);
router.get('/events/:subject', auth_1.default.verifyStudent, student_1.default.getAllEvents);
router.get('/people/all/:subject', auth_1.default.verifyStudent, student_1.default.allPeople);
exports.default = router;
