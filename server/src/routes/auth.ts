// var express = require("express");
import express from "express";
var router = express.Router();
// const Auth = require("../controllers/auth");
import Auth from "../controllers/auth"

/* GET users listing. */

router.post("/student/access/refresh", Auth.refreshAccessToken);
router.post("/student/login", Auth.studentLogin);
router.delete("/student/logout", Auth.logout);

router.post("/university/login", Auth.universityLogin)

export default router;
