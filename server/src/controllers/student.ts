import moment from "moment";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Razorpay from "razorpay";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import studentDB from "../services/student";
import validation from "../services/validation";
dotenv.config();

var instance = new Razorpay({
  key_id: 'rzp_test_8JLZOZRODQ9Mpc',
  key_secret: process.env.RAZOR_PAY_SECRET,
});


const createStudentAllotment: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    await validation.isStudentApllicationFormValid(req.body)
    req.body.DOB = moment(req.body.DOB)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await studentDB.createStudentAllotment(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err)
  }
}

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    await validation.isCreateStudentValid(req.body)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await studentDB.createStudent(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    console.log(err);
    res.status(err.status || 500).json(err)
  }
}

const allStudents: RequestHandler = async (req, res, next) => {
  try {
    let students = await studentDB.fetchStudents()
    res.status(200).json(students)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const blockStudent: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params
    if (!email) throw createHttpError.BadRequest("Email is required")
    const { isBlocked } = await studentDB.getStudentBlockStatus(email)
    await studentDB.blockStudents(email, isBlocked)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const getAStudent: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params
    if (!email) throw createHttpError.BadRequest("Email is required")
    let studentDetails = await studentDB.fetchAStudentDetails(email)
    res.status(200).json(studentDetails)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const admissionPayment: RequestHandler = async (req, res, next) => {
  try {
    var options = {
      amount: 5000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: `order_${Date.now()}_${Math.random()}`
    };
    instance.orders.create(options, function (err: any, order: any) {
      console.log(err)
      if (err) throw createHttpError.InternalServerError()
      res.status(200).json(order)
    });
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

const allSubjects: RequestHandler = async (req, res, next) => {
  try {
    res.send("All subjects will be provided")
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

export default { createStudentAllotment, createStudent, allStudents, blockStudent, getAStudent, admissionPayment, allSubjects }