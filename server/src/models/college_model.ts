import mongoose, { Types } from "mongoose";
import { COLLEGE_COLLECTION } from "../constants/constants";

export interface College {
  _id : Types.ObjectId,
  name : string,
  email : string,
  collegeId : string,
  Password : string,
  Place : string,
  University : string,
  Course : [{
    ref : Types.ObjectId,
    maxCandidate : Number, 
  }],
  isApproved : boolean,
}

const collegeSchema = new mongoose.Schema({
  _id : {
    type : Types.ObjectId,
    default : new Types.ObjectId
  },
  name : String,
  email : String,
  collegeId : {
    type: String,
    unique : true
  },
  password : String,
  place : String,
  university : Types.ObjectId,
  Course : [{
    ref : Types.ObjectId,
    maxCandidate : Number
  }],
  isApproved : {
    type : Boolean,
    default : false,
  },
}, {_id : false})

export const collegeModel = mongoose.model("collegeModel", collegeSchema, COLLEGE_COLLECTION)