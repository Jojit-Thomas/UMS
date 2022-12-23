import mongoose, { Types } from "mongoose"
import { STUDENT_APPLICATION_FORM } from "../constants/constants"
import { Gender } from "./typescript"


interface admissionPreferenceType {
  preference : number,
  collegeId: string,
  course: string
}


export interface studentApplicationFormType {
  name: string,
  address: string,
  email: string,
  totalMark: number,
  contact: string,
  admissionPreference: [admissionPreferenceType],
  gender: Gender,
  markListLink: string,
  DOB: Date,
  educationalQualification : string,
  password : string,
  date : Date,
}


const studentApplicationSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    default: new Types.ObjectId
  },
  name: String,
  address: String,
  email: {
    type : String,
    lowercase : true,
    unique : true,
  },
  totalMark: Number,
  contact: String,
  admissionPreference: [{
    preference: Number,
    collegeId: String,
    course: String
  }],
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE']
  },
  markListLink: String,
  DOB: Date,
  educationalQualification : String,
  password : String,
  date : {
    type : Date,
    default : new Date()
  }
}, { _id: false })


export const studentApplicationModel = mongoose.model("studentApplicationModel", studentApplicationSchema, STUDENT_APPLICATION_FORM)