import createHttpError from "http-errors";
import { College, collegeModel } from "../models/college_model";

const createCollege = (body: College): Promise<void> => {
  return new Promise((resolve, reject) => {
    collegeModel.create(body).then(() => resolve()).catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        reject(createHttpError.Conflict("College ID needs to be unique"))
      } else {
        reject(createHttpError.InternalServerError())
      }
    })
  })
}

const fetchApprovedCollege = () => {
  return new Promise((resolve, reject) => {
    collegeModel.find({ isApproved: true }).then((colleges) => resolve(colleges)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError());
    })
  })
}

const invertApproval = (collegeId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      let college = await collegeModel.findOne({ collegeId: collegeId }, { isApproved: 1 });
      if (!college) throw createHttpError.NotFound("CollegeId is invalid");
      await collegeModel.updateOne({ collegeId: collegeId }, { $set: { isApproved: !college?.isApproved } });
      resolve();
    } catch (err: any) {
      console.log(err);
      if (err.status === 404) {
        reject(createHttpError.NotFound("CollegeId is invalid"))
      } else {
        reject(createHttpError.InternalServerError());
      }
    }
  })
}

export default { createCollege, fetchApprovedCollege, invertApproval }