import mongoose, { Types } from "mongoose"
import { BATCH_COLLECTION } from "../constants/constants"

export interface Batch {
  _id : Types.ObjectId,
  startYear : number,
  endYear : number,
  department : string,//relation to department
  classTeacher ?: string,
  exams : [{
    _id : Types.ObjectId
    sem : number,
    question : string,
    date : string,
    registrationFees : number  
  }]
}

const batchSchema = new mongoose.Schema({
  _id : {
    type : Types.ObjectId,
    default : new Types.ObjectId
  },
  startYear: Number,
  endYear : Number,
  department : String,
  classTeacher : String,
  exams : [{
    _id : {
      type : Types.ObjectId,
      default : new Types.ObjectId
    },
    sem : Number,
    question : String,
    date : String,
    registrationFees : Number
  }]
})

const batchModel = mongoose.model("batchModel", batchSchema, BATCH_COLLECTION)