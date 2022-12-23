import mongoose, { Types } from "mongoose";
import { COLLEGE_COLLECTION } from "../constants/constants";
import moment from "moment";


interface Subjects {
  name: string,
  teacher: string
}

interface Seats {
  year : number,
  seats : number
}

export interface Department {
  name: string,
  qualification: string,
  maxCandidate: number,
  semesters: [{
    sem: number,
    subjects: Subjects[]
  }],
  seats : Seats[]
}

export interface College {
  _id: Types.ObjectId,
  name: string,
  email: string,
  collegeId: string,
  password: string,
  contact: string,
  address: string,
  department: Department[],
  isApproved: boolean,
}

console.log(new Types.ObjectId)

const departmentSchema = new mongoose.Schema({
  name : String,
  qualification : String,
  maxCandidate: Number,
  semesters : [{
    sem: Number,
    subjects: [{
      name: String,
      teacher : String
    }]
  }],
  seats : {
    type: Array,
    default : [{year : moment(new Date).year(), seats: 0}]
  }
}, { _id: false })


const collegeSchema = new mongoose.Schema({
  name: String,
  email: String,
  collegeId: {
    type: String,
    unique: true
  },
  password: String,
  contact: String,
  address: String,
  place: String,
  university: Types.ObjectId,
  department: [departmentSchema],
  isApproved: {
    type: Boolean,
    default: false,
  },
})

export const collegeModel = mongoose.model("collegeModel", collegeSchema, COLLEGE_COLLECTION)