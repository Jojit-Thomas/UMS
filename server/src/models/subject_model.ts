import mongoose, { Types } from "mongoose"
import { SUBJECTS_COLLECTION } from "../constants/constants"

export interface Subject {
  name : String,
  teacher ?: Types.ObjectId
}

const subjectSchema = new mongoose.Schema({
  name : {
    type : String,
    unique : true
  },
  teacher : {
    type : Types.ObjectId,
    default : new Types.ObjectId("507f191e810c19729de860ea")
  }
})

export const subjectModel = mongoose.model("subjectModel", subjectSchema, SUBJECTS_COLLECTION)