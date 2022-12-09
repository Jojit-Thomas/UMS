import express from "express"
import student from "../controllers/student";
import college from "../controllers/college";
const router = express.Router()

router.post('/apply', college.createCollege)

export default router; 