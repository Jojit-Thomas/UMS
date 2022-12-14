import { RequestHandler } from "express";
import departmentDB from "../services/department";
import validation from "../services/validation";

const createDepartment: RequestHandler = async (req, res, next) => {
  try {
    console.log("create department")
    await validation.isDepartmentSchemaValid(req.body)
    await departmentDB.createDepartment(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const allDepartments: RequestHandler = async (req, res, next) => {
  try {
    let departments = await departmentDB.fetchAllDepartment()
    res.status(200).json(departments)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

export default { createDepartment, allDepartments }