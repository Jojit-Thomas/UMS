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
  phone : string,
  address : string,
  password: string,
  DOB : Date,
  gender : Gender,
  batch : string,
  isBlocked : boolean,
  attendence : Array<Attendence>,

}

const studentSchema = new mongoose.Schema({
  _id : {
    type : String,
    default : new Types.ObjectId
  },
  name : String,
  email : {
    type: String,
    unique : true,
  },
  password : String,
  phone : String,
  address: String,
  isBlocked : Boolean,
  DOB : Date,
  gender : String,
  batch : String,
  attendence : [{
    date : Date,
    subject : String,
    isPresent: Boolean
  }]
}, {_id : false})

export const studentModel = mongoose.model("studentSchema", studentSchema, STUDENT_COLLECTION)