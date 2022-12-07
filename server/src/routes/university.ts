// var express = require("express");
import express from "express"
import bus from "../controllers/bus";
import user from "../controllers/user";
import { verifyUniversity } from "../middlewares/auth";
var router = express.Router();

/* GET users listing. */
router.get("/",verifyUniversity, function (req, res, next) {
  
});

router.get("/", verifyUniversity, user.allUsers)

router.put("/", verifyUniversity, user.block_user)



export default router;
