import mongoose, { Types } from "mongoose";

import { STUDENT_COLLECTION } from "../constants/constants"
import { Gender } from "./typescript";

interface Attendence {
  date : Date, 
  subject : string,
  isPresent : boolean
}

export interface Student {
  name : string,
  email : string,
  contact : string,
  address : string,
  password: string,
  DOB : Date,
  gender : Gender,
  classId : string,
  isBlocked : boolean,
  attendence : Array<Attendence>
  course : string,
}

const studentSchema = new mongoose.Schema({
  _id : Types.ObjectId,
  name : String,
  email : {
    type: String,
    lowercase : true,
    unique : true,
  },
  password : String,
  contact : String,
  address: String,
  isBlocked : {
    type : Boolean,
    default : false
  },
  DOB : Date,
  gender : String,
  classId : String,
  course : String,
  attendence : [{
    date : Date,
    subject : String,
    isPresent: Boolean
  }]
})

export const studentModel = mongoose.model("studentModel", studentSchema, STUDENT_COLLECTION)