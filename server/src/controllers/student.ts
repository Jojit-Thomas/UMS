import { RequestHandler } from "express";

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
  }catch(err) {
    console.log(err);
    res.status(err.status || 500).json(err)
  }
}

export default { createStudentAllotment }