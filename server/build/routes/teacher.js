"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacher_1 = __importDefault(require("../controllers/teacher"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post('/apply', teacher_1.default.createTeacher);
router.get('/class/all', auth_1.default.verifyTeacher, teacher_1.default.allClasses);
router.patch('/chat/add', auth_1.default.verifyTeacher, teacher_1.default.newChat);
router.get('/chat/:department/:subject/:semester', auth_1.default.verifyTeacher, teacher_1.default.getAllChats);
router.get('/events/:department/:subject/:semester', auth_1.default.verifyTeacher, teacher_1.default.getAllEvents);
router.get('/people/all/:department/:subject/:semester', auth_1.default.verifyTeacher, teacher_1.default.allPeople);
router.patch('/event/new/:department/:semester', auth_1.default.verifyTeacher, teacher_1.default.newEvent);
exports.default = router;
