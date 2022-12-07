import express from "express"
import studentDB from "../services/student";
const router = express.Router()

router.post('/student/add', studentDB.createStudent)

export default router;