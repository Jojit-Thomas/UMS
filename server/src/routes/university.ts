// var express = require("express");
import express from "express"
import subject from "../controllers/subject";
import { verifyUniversity } from "../middlewares/auth";
var router = express.Router();

/* GET users listing. */
router.get("/",verifyUniversity, function (req, res, next) {
  res.send("asdasdfasdff")
});

router.post("/subject/add", subject.createSubject)




export default router;
