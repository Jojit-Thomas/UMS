import { RequestHandler } from "express";
import createHttpError from "http-errors";
import collegeDB from "../services/college";
import validation from "../services/validation";
import bcrypt from "bcrypt"
import courseDB from "../services/course";
import college from "../services/college";
import moment from "moment";


function convertObject(obj: any) {
  //@ts-ignore
  obj.semesters.forEach(semester => semester.subjects = semester.subjects.map(subject => ({ name: subject, teacher: null })));
  delete obj._id;
  return obj;
}
  
const createCollege: RequestHandler = async (req, res, next) => {
  try {
    await validation.isCollegeSchemaValid(req.body)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    let department = req.body.department
    req.body.department = []
    await collegeDB.createCollege(req.body)
    department.forEach(async (elem: any) => {
      let course = await courseDB.fetchACourse(elem.ref)
      course = convertObject(course)
      course.maxCandidate = elem.maxCandidate
      course.seats = [{year : moment(new Date).year(), seats: req.body.maxCandidate}]
      await collegeDB.createCourse(req.body.collegeId, course)
    })
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
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}


const fetchAllDepartment: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const collegeId = req.user.aud
    if (!collegeId) throw createHttpError.InternalServerError()
    let department = await collegeDB.fetchAllDepartment(collegeId);
    res.status(200).json(department)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const inverteApproval: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.collegeId) throw createHttpError.BadRequest("collegeId is required : body")
    await collegeDB.invertApproval(req.body.collegeId)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const fetchAllCollege: RequestHandler = async (req, res, next) => {
  try {
    let college = await collegeDB.fetchAllCollege()
    res.status(200).json(college)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const newDepartment: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const collegeId = req.user.aud
    if (!collegeId) throw createHttpError.InternalServerError()
    req.body.seats = [{year : moment(new Date).year(), seats: req.body.maxCandidate}]
    await collegeDB.createCourse(collegeId, req.body)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const fetchADepartment: RequestHandler = async (req, res, next) => {
  try{
    //@ts-ignore
    const collegeId = req.user.aud
    const {department} = req.params;
    if (!collegeId || !department) throw createHttpError.InternalServerError()
    let departmentObj = await collegeDB.fetchADepartment(collegeId, department)
    console.log(departmentObj);
    res.status(200).json(departmentObj)
  } catch(err : any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

const updateDepartment: RequestHandler = async (req, res, next) => {
  try{ 
    //@ts-ignore
    const collegeId = req.user.aud
    if (!collegeId) throw createHttpError.InternalServerError()
    await college.updateDepartment(collegeId, req.body)
    res.sendStatus(204)
  } catch(err : any) {
    res.status(err.status || 500).json(err.message || "Internal Sever Error")
  }
}

export default { createCollege, fetchApprovedCollege, inverteApproval, fetchAllCollege, fetchAllDepartment, newDepartment,fetchADepartment, updateDepartment }