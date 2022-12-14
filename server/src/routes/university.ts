// var express = require("express");
import express from "express"
import department from "../controllers/department";
import subject from "../controllers/subject";
import authMW from "../middlewares/auth";
var router = express.Router();

/* GET users listing. */
router.get("/", authMW.verifyUniversity, function (req, res, next) {
  res.send("asdasdfasdff")
});

router.post("/subject/add", subject.createSubject)

router.post("/department/add", department.createDepartment)

export default router;
