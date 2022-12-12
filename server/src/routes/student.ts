// var express = require('express');
import express from "express";
import student from "../controllers/student";
// const { verify } = require('../middlewares/auth');

var router = express.Router();



/* GET home page. */

router.post('/add', student.createStudent)

router.get('/all', student.allStudents)

router.patch('/:email/block', student.blockStudent);

router.get('/:email', student.getAStudent)

router.post('/admission/apply', student.createStudentAllotment)

router.post('/admission/pay', student.admissionPayment)


export default router;
