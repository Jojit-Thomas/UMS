import { RequestHandler } from "express";
import teacherDB from "../services/teacher";
import validation from "../services/validation";

const createTeacher:RequestHandler = async (req, res, next) => {
  try{
    await validation.isTeacherSchemaValid(req.body);
    await teacherDB.createTeacher(req.body);
    res.sendStatus(204)
  }catch(err: any ) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
} 

export default {createTeacher}