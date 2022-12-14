// const model = {
//   year : 2020,
//   course : "B.Tech",
//   classTeacher : "John Doe", // class teacher name 
//   exams : [{
//     sem : 1,
//     question : "",
//     date : "2022-12-12",
//     registration_fees : 500
//   }]
// }



// const course = {
//   name : "B.Tech",
//   qualification : "High School", // enum
//   semesters : [
//     {
//       sem : 1,
//       subjects : ["Maths","C Programming", "python"],
//     },
//     {
//       sem : 2,
//       subjects : ["English","C Programming", "python"],
//     },
//   ]
// }


import mongoose, { Types } from "mongoose"
import { DEPARTMENT_COLLECTION } from "../constants/constants"

export interface Department {
  name: string,
  qualification: string,
  semesters: [{
    sem: number,
    subjects: Array<string>
  }]
}


const departmentSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
    default: Types.ObjectId
  },
  name: {
    type: String,
    unique: true
  },
  qualification: String,
  semesters: [{
    sem: Number,
    subjects: [String]
  }]
}, { _id: false })

export const departmentModel = mongoose.model("departmentModel", departmentSchema, DEPARTMENT_COLLECTION)