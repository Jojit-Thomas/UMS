import express from "express";
import teacher from "../controllers/teacher";
const router = express.Router()

router.post('/apply', teacher.createTeacher)

export default router;