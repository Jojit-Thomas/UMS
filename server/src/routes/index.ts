// var express = require('express');
import express from "express";
import bus from "../controllers/bus";
import studentDB from "../controllers/student";
import { verify } from "../middlewares/auth";
// const { verify } = require('../middlewares/auth');

var router = express.Router();



/* GET home page. */
router.get("/", function (req, res) {
  console.log("api page")
  res.status(200).json("Success Home page")
})

router.post('/admission/apply', studentDB.createStudentAllotment)

// router.get('/bus',verify, bus.allBus);

// router.get('/bus/:id',verify, bus.busDetails);

// router.post("/bus/book", bus.bookSeat)

export default router;
