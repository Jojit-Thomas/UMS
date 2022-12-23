import { RequestHandler } from "express";
import departmentDB from "../services/course";
import validation from "../services/validation";

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    console.log("create department")
    await validation.isCourseSchemaValid(req.body)
    await departmentDB.createCourse(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const allCourses: RequestHandler = async (req, res, next) => {
  try {
    let courses = await departmentDB.fetchAllCourse()
    res.status(200).json(courses)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

export default { createCourse, allCourses }