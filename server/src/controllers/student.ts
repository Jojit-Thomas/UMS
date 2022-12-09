import { RequestHandler } from "express";
import createHttpError from "http-errors";

import studentDB from "../services/student"
import validation from "../services/validation";

const createStudentAllotment: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    
    await validation.isStudentApllicationFormValid(req.body)
    await studentDB.createStudentAllotment(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err)
  }
}

const createStudent: RequestHandler = async (req, res, next) => {
  try{
    console.log(req.body)
    await validation.isCreateStudentValid(req.body)
    await studentDB.createStudent(req.body)
    res.sendStatus(204)
  }catch(err: any) {
    console.log(err);
    res.status(err.status || 500).json(err)
  }
}

const allStudents: RequestHandler = async (req, res, next) => {
  try {
    let students = await studentDB.fetchStudents()
    res.status(200).json(students)
  } catch(err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const blockStudent: RequestHandler = async (req, res, next) => {
  try{  
    const {email} = req.params
    if(!email) throw createHttpError.BadRequest("Email is required")
    const {isBlocked} = await studentDB.getStudentBlockStatus(email)
    await studentDB.blockStudents(email,isBlocked)
    res.sendStatus(204)
  } catch(err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const getAStudent: RequestHandler = async (req, res, next) => {
  try{
    const {email} = req.params
    if(!email) throw createHttpError.BadRequest("Email is required")
    let studentDetails = await studentDB.fetchAStudentDetails(email)
    res.status(200).json(studentDetails)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

export default { createStudentAllotment, createStudent, allStudents, blockStudent, getAStudent }