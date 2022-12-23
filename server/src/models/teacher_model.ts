import mongoose, { Types } from "mongoose";
import { TEACHERS_COLLECTION } from "../constants/constants";
import { Gender } from "./typescript";


export interface Teacher {
  _id : Types.ObjectId,
  name : string,
  email : string,
  address : string,
  contact : string,
  password : string,
  subject : string,
  classTeacher : Types.ObjectId,
  qualification : string,
  collegeId : string,
  gender : Gender,
  isApproved : boolean,
  isBlocked : boolean,
  DOB : Date,
  skills : string,
  totalMark : string,
  experience : string,
}

const teacherSchema = new mongoose.Schema({
  _id : {
    type : Types.ObjectId,
    default : new Types.ObjectId
  },
  name : String,
  email : {
    type : String,
    lowercase : true,
    unique : true,
  },
  contact : String,
  password : String,
  subject : String,
  classTeacher : Types.ObjectId,
  qualification : String,
  collegeId : String,
  gender : {
    type : String,
    enum : ['MALE','FEMALE']
  },
  isApproved : {
    type : Boolean,
    default : false,
  },
  isBlocked : {
    type : Boolean,
    default : false
  },
  DOB : Date,
  skills : String,
  totalMark : Number,
  expereience : String,
}, {_id : false})

export const teacherModel = mongoose.model("teacherModel", teacherSchema, TEACHERS_COLLECTION)