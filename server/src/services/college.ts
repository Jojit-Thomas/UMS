import createHttpError from "http-errors";
import { College, collegeModel } from "../models/college_model";

const createCollege = (body : College): Promise<void> => {
  return new Promise((resolve, reject) => {
    collegeModel.create(body).then(() => resolve()).catch((err) => {
      console.error(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

export default {createCollege}