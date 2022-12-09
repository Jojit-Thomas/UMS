// var express = require('express');
import express from "express";
import studentDB from "../controllers/student";
import { verify } from "../middlewares/auth";
// const { verify } = require('../middlewares/auth');

var router = express.Router();



/* GET home page. */
router.get("/", function (req, res) {
  console.log("api page")
  res.status(200).json("Success Home page")
})

router.post('/student/add', studentDB.createStudent)

router.get('/students', studentDB.allStudents)

router.patch('/student/:email/block', studentDB.blockStudent);

router.get('/student/:email', studentDB.getAStudent)


router.post('/admission/apply', studentDB.createStudentAllotment)


export default router;
