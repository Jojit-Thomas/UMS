// var express = require("express");
import express from "express"
import department from "../controllers/course";
import subject from "../controllers/subject";
import authMW from "../middlewares/auth";
import college from "../controllers/college";
import course from "../controllers/course";
import student from "../controllers/student";
var router = express.Router();

/* GET users listing. */
router.get("/", authMW.verifyUniversity, function (req, res, next) {
  res.send("asdasdfasdff")
});

router.post("/subject/add", subject.createSubject)

router.post("/course/add", department.createCourse)

router.get("/college/all", college.fetchAllCollege)

router.get("/course/all", course.allCourses)

router.get("/course/:name", course.course)

router.put("/course/edit", course.updateCourse)

router.post("/allotment", student.allotment)

router.get("/allotment/all", student.getAllAllotmentThisYear)

router.patch('/allotment/approval/invert', authMW.verifyUniversity, student.blockStudentApplicants)


export default router;
