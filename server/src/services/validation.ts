// const createHttpError = require("http-errors");
import createHttpError from "http-errors";
// const Joi = require("joi");
import Joi from "joi";
import { Student } from "../models/student_model";

import { studentApplicationFormType } from "../models/student_application_model";


const studentSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: Joi.string().min(10).max(10).required(),
  DOB : Joi.string().required(),
  gender : Joi.string().valid('MALE','FEMALE').required(),
  batch : Joi.string().required(),
  attendence : Joi.array().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});


const studentApplicationFormSchema = Joi.object({
  name: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  address : Joi.string().trim().min(10).max(100).required(),
  totalMark : Joi.number().required(),
  admissionPreference : Joi.array().required(),
  gender : Joi.string().valid('MALE','FEMALE').required(),
  DOB : Joi.string().required(),
  markListLink : Joi.string().required()
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});





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


export default {isCreateStudentValid, isStudentApllicationFormValid}