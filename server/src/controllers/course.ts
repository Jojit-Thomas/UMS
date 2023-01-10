import { RequestHandler } from "express";
import courseDB from "../services/course";
import validation from "../services/validation";
import createHttpError from "http-errors";

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    console.log("create department")
    await validation.isCourseSchemaValid(req.body)
    await courseDB.createCourse(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const allCourses: RequestHandler = async (req, res, next) => {
  try {
    let courses = await courseDB.fetchAllCourse()
    res.status(200).json(courses)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const course: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.params
    let course = await courseDB.fetchACourse(name)
    res.status(200).json(course)
  } catch (err) {
    let error = err as createHttpError.HttpError
    res.status(error.status || 500).json(error.message || "Internal Server Error")
  }
}

const updateCourse: RequestHandler = async (req, res, next) => {
  try {
    const { _id } = req.body
    await validation.isCourseSchemaValid(req.body)
    await courseDB.updateCourse(_id, req.body)
    res.status(200).json(course)
  } catch (err) {
    let error = err as createHttpError.HttpError
    res.status(error.status || 500).json(error.message || "Internal Server Error")
  }
}



export default { createCourse, allCourses, course, updateCourse }