import mongoose, { Types } from "mongoose"
import { SUBJECTS_COLLECTION } from "../constants/constants"

export interface Subject {
  name: string,
  teacher?: Types.ObjectId
}

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
})

export const subjectModel = mongoose.model("subjectModel", subjectSchema, SUBJECTS_COLLECTION)