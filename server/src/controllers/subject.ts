import { RequestHandler } from "express";
import subjectDB from "../services/subject";

const createSubject: RequestHandler = async (req, res, next) => {
  try{
    await subjectDB.createSubject(req.body)
    res.sendStatus(204)
  } catch(err : any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

export default {createSubject}