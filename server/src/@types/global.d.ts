import express from "express"
import { Types } from "mongoose";

interface User {
  name : string,
  course : string,
  id : Types.ObjectId
  classId : string,
  iat : number, 
  exp : number,
  aud : string,
}

interface Teacher {
  name : string,
  collegeId : string,
  id : Types.ObjectId
  iat : number, 
  exp : number,
  aud : string
}

interface College {
  iat : number, 
  exp : number,
  aud : string
}


declare global {
  namespace Express {
    interface Request {
      user: User;
      teacher : Teacher;
      college : College;
      universtiy: Object;
    }
  }
}
interface Error {
  status: number;
}
