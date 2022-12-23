import mongoose, { Types } from "mongoose"
import { CLASS_COLLECTION } from "../constants/constants"

interface Student {
  name : string,
  email : string
}

export interface Chats {
  name : string,
  email : string,
  date : Date,
  message : string,
}

export interface ClassType {
  _id ?: Types.ObjectId,
  year : number,
  course : string,//relation to course
  collegeId : string,
  sem : number,
  classTeacher ?: string,
  students : [Student],
  chats : [Chats]
  // exams : [{
  //   _id : Types.ObjectId
  //   sem : number,
  //   question : string,
  //   date : string,
  //   registrationFees : number  
  // }]
}

const studentSchema = new mongoose.Schema({
  name : String, 
  email : String
}, {_id : false})

const chatSchema = new mongoose.Schema({
  name : String,
  email : String,
  date : Date,
  message : String
})

const classSchema = new mongoose.Schema({
  year: Number,
  course : String,
  classTeacher : String,
  collegeId : String,
  classId : {
    type : String, 
    unique : true
  },
  sem : Number,
  students : [studentSchema],
  chats : [chatSchema]
})

export const classModel = mongoose.model("classModel", classSchema, CLASS_COLLECTION)