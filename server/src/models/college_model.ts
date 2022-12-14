import mongoose, { Types } from "mongoose";
import { COLLEGE_COLLECTION } from "../constants/constants";

interface course {
  id: number,
  ref: string,
  maxCandidate: Number,
}

export interface College {
  _id: Types.ObjectId,
  name: string,
  email: string,
  collegeId: string,
  password: string,
  contact: string,
  address: string,
  course: course[],
  isApproved: boolean,
}

console.log(new Types.ObjectId)

const courseSchema = new mongoose.Schema({
  id: Number,
  ref: String,
  maxCandidate: Number
}, { _id: false })


const collegeSchema = new mongoose.Schema({
  name: String,
  email: String,
  collegeId: {
    type: String,
    unique: true
  },
  password: String,
  place: String,
  university: Types.ObjectId,
  course: [courseSchema],
  isApproved: {
    type: Boolean,
    default: false,
  },
})

export const collegeModel = mongoose.model("collegeModel", collegeSchema, COLLEGE_COLLECTION)