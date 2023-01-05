import express from "express"
import student from "../controllers/student";
import college from "../controllers/college";
import course from "../controllers/course";
import teacher from "../controllers/teacher";
import auth from "../middlewares/auth";
const router = express.Router()

// Base Url = /api/college

router.post('/apply', college.createCollege)

router.get('/list', college.fetchApprovedCollege)

router.patch('/approval/invert', college.inverteApproval)

router.get('/course/all', course.allCourses)

router.get('/department/all', auth.verifyCollege, college.fetchAllDepartment)

router.get('/student/all', student.allStudents)

router.patch('/student/block', student.blockStudent);

router.get('/student/:email', student.getAStudent)

router.get('/teacher/application', auth.verifyCollege, teacher.fetchPendingApplication)

router.patch('/teacher/application/approve', teacher.approveApplication)

router.get('/teacher/all', auth.verifyCollege, teacher.fetchTeachers)

router.post('/department/add', auth.verifyCollege, college.newDepartment)

router.get('/department/:department', auth.verifyCollege, college.fetchADepartment)

router.put('/department/edit', auth.verifyCollege, college.updateDepartment)

router.patch('/teacher/block', auth.verifyCollege, teacher.blockTeacher)


// router.get()

export default router; 