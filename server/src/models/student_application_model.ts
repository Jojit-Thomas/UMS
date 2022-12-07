import mongoose, { Types } from "mongoose"
import { STUDENT_APPLICATION_FORM } from "../constants/constants"
import { Gender } from "./typescript"


interface admissionPreferenceType {
  college : String,
  course : String
}


export interface studentApplicationFormType  {
   name : String,
   address : String,
   email: String,
   totalMark : Number,
   phone : String,
   admissionPreference :  [admissionPreferenceType],
   gender : Gender,
   markListLink : String
}


const studentApplicationSchema = new mongoose.Schema({
  _id : {
    type : Types.ObjectId,
    default : new Types.ObjectId
  },
  name : String,
  address : String,
  email : String,
  totalMark : Number,
  phone: String,
  admissionPreference : [{
    college : String,
    course : String
  }],
  gender : {
    type : String,
    enum : ['MALE','FEMALE']
  },
  markListLink: String,
}, {_id : false})


export const studentApplicationModel = mongoose.model("studentApplicationModel", studentApplicationSchema, STUDENT_APPLICATION_FORM)