import createHttpError from "http-errors";
import { Department, departmentModel } from "../models/department_model";

const createDepartment = (body: Department): Promise<void> => {
  return new Promise((resolve, reject) => {
    departmentModel.create(body).then(() => resolve()).catch((err) => {
      console.log(err)
      if (err.code === 11000) {
        reject(createHttpError.Conflict("Deaparment already registered"))
      } else {
        reject(createHttpError.InternalServerError())
      }
    })
  })
}

const fetchAllDepartment = () => {
  return new Promise((resolve, reject) => {
    departmentModel.find().lean().then((departments) => resolve(departments)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

export default { createDepartment, fetchAllDepartment }