import mongoose, { Types } from "mongoose"
import { STUDENT_APPLICATION_FORM } from "../constants/constants"
import { Gender } from "./typescript"


interface admissionPreferenceType {
  collegeId: string,
  course: string
}


export interface studentApplicationFormType {
  name: string,
  address: string,
  email: string,
  totalMark: Number,
  phone: string,
  admissionPreference: [admissionPreferenceType],
  gender: Gender,
  markListLink: string,
  DOB: Date
}


const studentApplicationSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId
  },
  name: String,
  address: String,
  email: String,
  totalMark: Number,
  phone: String,
  admissionPreference: [{
    collegeId: String,
    course: String
  }],
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE']
  },
  markListLink: String,
  DOB: Date,
}, { _id: false })


export const studentApplicationModel = mongoose.model("studentApplicationModel", studentApplicationSchema, STUDENT_APPLICATION_FORM)