import createHttpError from "http-errors";
import {  Course, courseModel } from "../models/course_model";

const createCourse = (body: Course): Promise<void> => {
  return new Promise((resolve, reject) => {
    courseModel.create(body).then(() => resolve()).catch((err) => {
      console.log(err)
      if (err.code === 11000) {
        reject(createHttpError.Conflict("Deaparment already registered"))
      } else {
        reject(createHttpError.InternalServerError())
      }
    })
  })
}

const fetchAllCourse = () => {
  return new Promise((resolve, reject) => {
    courseModel.find().lean().then((departments) => resolve(departments)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchACourse = (name : string):Promise<any> => {
  return new Promise((resolve, reject) => {
    courseModel.findOne({name : name}).lean().then((course) => {
      if(course) resolve(course)
      else reject(createHttpError.NotFound("Course not Found"))
    })
  })
}

export default { createCourse, fetchAllCourse, fetchACourse }