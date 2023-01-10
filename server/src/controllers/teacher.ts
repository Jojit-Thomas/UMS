import { RequestHandler } from "express";
import teacherDB from "../services/teacher";
import validation from "../services/validation";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import college from "../services/college";
import classDB from "../services/class";
import { Chats } from "../models/class_model";

const createTeacher: RequestHandler = async (req, res, next) => {
  try {
    await validation.isTeacherSchemaValid(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await teacherDB.createTeacher(req.body);
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}

const fetchTeachers: RequestHandler = async (req, res, next) => {
  try {
    console.log("kajklsjdfkljaklsjdfklklajsldf")
    console.log("teacher : ",req.college)
    //@ts-ignore
    const collegeId = req.college.aud
    if (!collegeId) throw createHttpError.InternalServerError()
    let teachers = await teacherDB.fetchApprovedTeachers(collegeId);
    res.status(200).json(teachers)
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}

const fetchPendingApplication: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const collegeId = req.college.aud
    if (!collegeId) throw createHttpError.InternalServerError()
    let applications = await teacherDB.fetchApplications(collegeId);
    res.status(200).json(applications)
  } catch (err: any) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}

const approveApplication: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createHttpError.BadRequest("Email is required")
    await teacherDB.approveApplication(email);
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}

const fetchATeacher: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const { email } = req.params;
    if (!email) throw createHttpError.BadRequest("email param is required")
    let teacher = await teacherDB.fetchATeacher(email)
    res.status(200).json(teacher)

  } catch (err: any) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}


const blockTeacher: RequestHandler = async (req, res, next) => {
  try {
    //@ts-ignore
    const { email } = req.body;
    if (!email) throw createHttpError.BadRequest("email param is required")
    let { isBlocked } = await teacherDB.fetchATeacher(email)
    await teacherDB.blockTeacher(email, isBlocked)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message)
  }
}

const allClasses: RequestHandler = async (req, res, next) => {
  try {
    let classes = await college.getAllTeachingSubjects(req.teacher.aud)
    res.status(200).json(classes)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const getAllChats: RequestHandler = async (req, res, next) => {
  try {
    const {department, subject, semester} = req.params;
    const {collegeId} = req.teacher;
    console.log(collegeId, department, subject, parseInt(semester))
    let chats = await classDB.teacherAllChats(collegeId, department, subject, parseInt(semester))
    console.log(chats)
    res.status(200).json(chats)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}

const getAllEvents: RequestHandler = async (req, res, next) => {
  try {
    const {department, subject, semester} = req.params;
    const {collegeId} = req.teacher;
    let chats = await classDB.teacherAllEvents(collegeId, department, subject, parseInt(semester))
    console.log(chats)
    res.status(200).json(chats)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal Server Error")
  }
}
  

const newChat:RequestHandler = async (req, res, next) => {
  try {
    console.log(req.teacher)
    const {message, subject, classId} = req.body;
    let chat : Chats = {
      name : req.teacher.name,
      userId : req.teacher.id,
      date : new Date,
      subject : subject,
      message : message
    }
    await classDB.newChat(classId, chat)
    res.sendStatus(204)
  } catch(err : any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

const allPeople: RequestHandler = async (req, res, next) => {
  try {
    const {department, subject, semester} = req.params;
    const {collegeId} = req.teacher;
    console.log("subject : ",subject)
    let students = await classDB.findAllStudents(collegeId, department, semester)
    //@ts-ignore
    // let teachers = await collegeDB.findTeacherInClass(students.collegeId, student.course, students.sem, subject)
    // console.log(teachers)
    res.status(200).json({details : students, teachers : req.teacher.aud})
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

const newEvent:RequestHandler = async (req, res, next) => {
  try {
    // :department/:subject/:semester
    const { department, semester } = req.params
    const {collegeId} = req.teacher
    await classDB.newEvent(collegeId, department, parseInt(semester), req.body)
    res.sendStatus(204)
  } catch(err) {
    let error = err as createHttpError.HttpError
    res.status(error.status || 500).json(error.message || "Internal server error")
  }
}


export default { createTeacher, fetchTeachers, fetchPendingApplication, approveApplication, fetchATeacher, blockTeacher, allClasses, getAllChats, newChat, allPeople, newEvent, getAllEvents}