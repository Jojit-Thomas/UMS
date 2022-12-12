import express from "express"
import student from "../controllers/student";
import college from "../controllers/college";
const router = express.Router()

// Base Url = /api/college

router.post('/apply', college.createCollege)

router.get('/list', college.fetchApprovedCollege)

router.patch('/approval/invert', college.inverteApproval)

export default router; 