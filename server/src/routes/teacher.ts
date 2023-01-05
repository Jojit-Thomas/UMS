import express from "express";
import teacher from "../controllers/teacher";
import auth from "../middlewares/auth";
const router = express.Router()

router.post('/apply', teacher.createTeacher)

router.get('/class/all', auth.verifyTeacher, teacher.allClasses)

router.patch('/chat/add', auth.verifyTeacher, teacher.newChat)

router.get('/chat/:department/:subject/:semester', auth.verifyTeacher, teacher.getAllChats)

router.get('/people/all/:department/:subject/:semester', auth.verifyTeacher, teacher.allPeople)

export default router;