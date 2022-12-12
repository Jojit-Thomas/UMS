// const createHttpError = require("http-errors");
import createHttpError from "http-errors";
// const Joi = require("joi");
import Joi from "joi";
import { Student } from "../models/student_model";

import { studentApplicationFormType } from "../models/student_application_model";
import { College } from "../models/college_model";
import { Teacher } from "../models/teacher_model";


const studentSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments : 4,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: Joi.string().min(10).max(10).required(),
  DOB : Joi.string().required(),
  address : Joi.string().min(4).max(50).required(),
  gender : Joi.string().valid('MALE','FEMALE').required(),
  isBlocked : Joi.boolean(),
  batch : Joi.string().required(),
  attendence : Joi.array().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});


const studentApplicationFormSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments : 4,
    tlds: { allow: ["com", "net"] },
  }).required(),
  educationalQualification : Joi.string().required(),
  password : Joi.string().min(8).max(40).required(),
  contact : Joi.string().min(10).max(10).required(),
  address : Joi.string().trim().min(10).max(100).required(),
  totalMark : Joi.number().required(),
  admissionPreference : Joi.array().required(),
  gender : Joi.string().valid('MALE','FEMALE').required(),
  DOB : Joi.string().required(),
  markListLink : Joi.string().required()
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});

const collegeSchema = Joi.object({
  name : Joi.string().min(3).max(50).required(),
  email : Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments : 4,
    tlds: { allow: ["com", "net"] },
  }),
  collegeId : Joi.string().min(5).max(30).required(),
  password : Joi.string().min(8).max(40).required(),
  place : Joi.string().min(3).max(30).required(),
  university : Joi.string().min(3).max(30).required(),
  course : Joi.array().required()
})

const teacherSchema = Joi.object({
  name : Joi.string().min(3).max(50).required(),
  email : Joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments : 4,
    tlds: { allow: ["com", "net"] },
  }),
  phone : Joi.string().min(10).max(10).required(),
  password : Joi.string().min(8).max(30).required(),
  subject : Joi.string().required(),
  classTeacher : Joi.string(),
  qualification : Joi.string().required(),
  gender : Joi.string().valid('MALE','FEMALE').required(),
  collegeId : Joi.string().required()
})


const isCreateStudentValid = (params: Student): Promise<Student> => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await studentSchema.validate(params, { abortEarly: false })
    if(error) {
      reject(createHttpError.BadRequest(JSON.stringify(error.details)))
    }else{
      resolve(value)
    }
  })
}


const isStudentApllicationFormValid = (params: studentApplicationFormType): Promise<studentApplicationFormType> => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await studentApplicationFormSchema.validate(params, { abortEarly: false })
    if(error) {
      reject(createHttpError.BadRequest(JSON.stringify(error.details)))
    }else{
      resolve(value)
    }
  })
}


const isCollegeSchemaValid = (params: College): Promise<College> => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await collegeSchema.validate(params, { abortEarly: false })
    if(error) {
      reject(createHttpError.BadRequest(JSON.stringify(error.details)))
    }else{
      resolve(value)
    }
  })
}


const isTeacherSchemaValid = (params: Teacher): Promise<Teacher> => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = await teacherSchema.validate(params, { abortEarly: false })
    if(error) {
      reject(createHttpError.BadRequest(JSON.stringify(error.details)))
    }else{
      resolve(value)
    }
  })
}




export default {isCreateStudentValid, isStudentApllicationFormValid, isCollegeSchemaValid, isTeacherSchemaValid}