// var express = require("express");
import express from "express"
import department from "../controllers/department";
import subject from "../controllers/subject";
import authMW from "../middlewares/auth";
import college from "../controllers/college";
var router = express.Router();

/* GET users listing. */
router.get("/", authMW.verifyUniversity, function (req, res, next) {
  res.send("asdasdfasdff")
});

router.post("/subject/add", subject.createSubject)

router.post("/department/add", department.createDepartment)

router.get("/college/all", college.fetchAllCollege)

export default router;
