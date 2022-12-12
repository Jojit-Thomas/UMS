import { RequestHandler } from "express";
import createHttpError from "http-errors";
import moment from "moment";
import collegeDB from "../services/college";
import validation from "../services/validation";


const createCollege: RequestHandler = async (req, res, next) => {
  try {
    await validation.isCollegeSchemaValid(req.body)
    req.body.isApproved = false;
    req.body.DOB = moment(req.body.DOB)
    await collegeDB.createCollege(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const fetchApprovedCollege: RequestHandler = async (req, res, next) => {
  try {
    let colleges = await collegeDB.fetchApprovedCollege()
    res.status(200).json(colleges)
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err.message)
  }
}

const inverteApproval: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.collegeId) throw createHttpError.BadRequest("collegeId is required : body")
    await collegeDB.invertApproval(req.body.collegeId)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}


export default { createCollege, fetchApprovedCollege, inverteApproval }