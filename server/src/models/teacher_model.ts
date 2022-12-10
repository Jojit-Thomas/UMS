import mongoose, { Types } from "mongoose";
import { TEACHERS_COLLECTION } from "../constants/constants";
import { Gender } from "./typescript";


export interface Teacher {
  _id : Types.ObjectId,
  name : string,
  email : string,
  phone : string,
  password : string,
  subject : Types.ObjectId,
  classTeacher : Types.ObjectId,
  qualification : string,
  gender : Gender,
  collegeId : string,
  isApproved : boolean
}



const teacherSchema = new mongoose.Schema({
  _id : {
    type : Types.ObjectId,
    default : new Types.ObjectId
  },
  name : String,
  email : String,
  phone : String,
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
  }
}, {_id : false})

export const teacherModel = mongoose.model("teacherModel", teacherSchema, TEACHERS_COLLECTION)