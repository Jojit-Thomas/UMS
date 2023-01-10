"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var express = require("express");
const express_1 = __importDefault(require("express"));
const course_1 = __importDefault(require("../controllers/course"));
const subject_1 = __importDefault(require("../controllers/subject"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const college_1 = __importDefault(require("../controllers/college"));
const course_2 = __importDefault(require("../controllers/course"));
const student_1 = __importDefault(require("../controllers/student"));
var router = express_1.default.Router();
/* GET users listing. */
router.get("/", auth_1.default.verifyUniversity, function (req, res, next) {
    res.send("asdasdfasdff");
});
router.post("/subject/add", subject_1.default.createSubject);
router.post("/course/add", course_1.default.createCourse);
router.get("/college/all", college_1.default.fetchAllCollege);
router.get("/course/all", course_2.default.allCourses);
router.get("/course/:name", course_2.default.course);
router.put("/course/edit", course_2.default.updateCourse);
router.post("/allotment", student_1.default.allotment);
router.get("/allotment/all", student_1.default.getAllAllotmentThisYear);
router.patch('/allotment/approval/invert', auth_1.default.verifyUniversity, student_1.default.blockStudentApplicants);
exports.default = router;
