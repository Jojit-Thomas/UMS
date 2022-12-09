import { RequestHandler } from "express";
import collegeDB from "../services/college";
import validation from "../services/validation";


const createCollege: RequestHandler = async (req, res, next) => {
  try{
    await validation.isCollegeSchemaValid(req.body)
    req.body.isApproved = false;
    await collegeDB.createCollege(req.body)
    res.sendStatus(204)
  }catch(err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}


export default {createCollege}