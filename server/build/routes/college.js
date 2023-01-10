"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../controllers/student"));
const college_1 = __importDefault(require("../controllers/college"));
const course_1 = __importDefault(require("../controllers/course"));
const teacher_1 = __importDefault(require("../controllers/teacher"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
// Base Url = /api/college
router.post('/apply', college_1.default.createCollege);
router.get('/list', college_1.default.fetchApprovedCollege);
router.patch('/approval/invert', college_1.default.inverteApproval);
router.get('/course/all', course_1.default.allCourses);
router.get('/department/all', auth_1.default.verifyCollege, college_1.default.fetchAllDepartment);
router.get('/student/all', student_1.default.allStudents);
router.patch('/student/block', student_1.default.blockStudent);
router.get('/student/:email', student_1.default.getAStudent);
router.get('/teacher/application', auth_1.default.verifyCollege, teacher_1.default.fetchPendingApplication);
router.patch('/teacher/application/approve', teacher_1.default.approveApplication);
router.get('/teacher/all', auth_1.default.verifyCollege, teacher_1.default.fetchTeachers);
router.post('/department/add', auth_1.default.verifyCollege, college_1.default.newDepartment);
router.get('/department/:department', auth_1.default.verifyCollege, college_1.default.fetchADepartment);
router.put('/department/edit', auth_1.default.verifyCollege, college_1.default.updateDepartment);
router.patch('/teacher/block', auth_1.default.verifyCollege, teacher_1.default.blockTeacher);
// router.get()
exports.default = router;
