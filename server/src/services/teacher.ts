import createHttpError from "http-errors";
import { Teacher, teacherModel } from "../models/teacher_model";

const createTeacher = (body : Teacher): Promise<void> => {
  return new Promise((resolve, reject) => {
    teacherModel.create(body).then(() => resolve()).catch((err) => {
      console.log(err);
       if(err.code === 11000) {
        reject(createHttpError.Conflict("Teacher is already registered"))
      } else {
        reject(createHttpError.InternalServerError()) 
      }
    })
  })  
}


export default {createTeacher}