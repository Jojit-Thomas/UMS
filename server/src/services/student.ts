import createHttpError from "http-errors";
import { resolve } from "path";
import { studentApplicationFormType, studentApplicationModel } from "../models/student_application_model";
import { Student, studentModel } from "../models/student_model";

const createStudentAllotment = (body: studentApplicationFormType): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentApplicationModel.create(body).then(() => resolve()).catch((err) => { console.log(err); reject(createHttpError.InternalServerError()) })
  })
}

const createStudent = (body: Student): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentModel.create(body).then(() => resolve()).catch((err) => { console.log(err); reject(createHttpError.InternalServerError()) })
  })
}

export default { createStudentAllotment, createStudent }