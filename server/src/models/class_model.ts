import mongoose, { Types } from "mongoose"
import { CLASS_COLLECTION } from "../constants/constants"

interface Student {
  name : string,
  email : string
}

export interface ClassEvents {
  message : string,
  subject : string,
  url : string, 
  date : Date
}

export interface Chats {
  name : string,
  userId : Types.ObjectId,
  subject : string,
  date : Date,
  message : string,
}

export interface ClassType {
  _id : Types.ObjectId,
  year : number,
  course : string,//relation to course
  collegeId : string,
  sem : number,
  classTeacher ?: string,
  students : [Student],
  chats : [Chats]
  events : [ClassEvents]
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
  userId : Types.ObjectId,
  subject : String,
  date : Date,
  message : String
}, {_id : false})

const eventSchema = new mongoose.Schema({
  message : String,
  subject : String,
  url : String,
  date : {
    type : Date,
    default : new Date()
  }
}, {_id: false})

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
  chats : [chatSchema],
  events : [eventSchema],
})

export const classModel = mongoose.model<ClassType>("classModel", classSchema, CLASS_COLLECTION)