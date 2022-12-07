import mongoose, { Schema } from "mongoose";

import {BUS_COLLECTION } from "../constants/constants"

interface slot_type {
  isReserved : boolean,
  user : String
}

export interface bus_type {
  name : String,
  row : Number,
  col : Number,
  fare : Number,
  from : String,
  to : String,
  slots : Array<Array<slot_type>>,
}

const slot_schema = new mongoose.Schema({
  isReserved : {
    default : false,
    type : Boolean
  },
  user : {
    default : "",
    type : String
  },
})

const bus_schema = new mongoose.Schema({
  name : String,
  from : String,
  to : String,
  row : Number,
  col : Number,
  fare : Number,
  slots : Schema.Types.Mixed,//[[slot_schema]]
})





export const bus_model = mongoose.model("bus_schema", bus_schema, BUS_COLLECTION)