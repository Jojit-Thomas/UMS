import createHttpError from "http-errors";
import {subjectModel, Subject} from "../models/subject_model";

const createSubject = (body : Subject): Promise<void> => {
  return new Promise((resolve, reject) => {
    subjectModel.create(body).then(() => resolve()).catch((err) => {
      if(err.code === 11000) {
        reject(createHttpError.Conflict("Subject is already registered"))
      } else {
        console.log(err);
        reject(createHttpError.InternalServerError()) 
      }
    })
  })
}

export default {createSubject}