// var express = require('express');
import express from "express";
import auth from "../middlewares/auth";
import student from "../controllers/student";
import authMW from "../middlewares/auth";
var router = express.Router();



/* GET home page. */
router.get('/subject/all', authMW.verifyStudent, student.allSubjects)

router.post('/add', student.createStudent)

router.post('/admission/apply', student.createStudentAllotment)

router.post('/admission/pay', student.admissionPayment)

router.patch('/chat/add', authMW.verifyStudent, student.newChat)


export default router;
