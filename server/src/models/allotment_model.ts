import mongoose, { Types } from "mongoose"
import { ALLOTMENT_COLLECTION, } from "../constants/constants"

export interface SelectedStudent {
  collegeId: string,
  course: string,
  name: string,
  email: string
}

export interface Subject {
  date: Date,
  selectedStudents: [SelectedStudent]
}

const selectedStudentsSchema = new mongoose.Schema({
  collegeId: String,
  course: String,
  name: String,
  email: String
}, { _id: false })

const allotmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date
  },
  selectedSutdents: [selectedStudentsSchema]
})

export const allotmentModel = mongoose.model("allotmentModel", allotmentSchema, ALLOTMENT_COLLECTION)