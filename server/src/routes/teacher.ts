import express from "express";
import teacher from "../controllers/teacher";
import auth from "../middlewares/auth";
const router = express.Router()

router.post('/apply', teacher.createTeacher)

router.get('/class/all', auth.verifyTeacher, teacher.allClasses)


export default router;