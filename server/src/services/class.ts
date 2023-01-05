import createHttpError from "http-errors"
import { Chats, ClassType, classModel } from "../models/class_model"

const createClass = (body: ClassType): Promise<void> => {
  return new Promise((resolve, reject) => {
    classModel.create(body).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchClassDetails = (classId: string): Promise<ClassType> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.findOne({ classId: classId }).then((classDoc) => resolve(classDoc)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const newChat = (classId: string, chats: Chats): Promise<void> => {
  return new Promise((resolve, reject) => {
    classModel.updateOne({ classId: classId }, { $push: { chats: chats } }).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const teacherAllChats = (course: string, subject: string, semester : number): Promise<Chats[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.aggregate([
      {
        $match: { course: course, sem : semester }
      },
      {
        $unwind: "$chats"
      },
      {
        $match: { "chats.subject": subject }
      },
      {
        $project: { "chats": 1, "_id": 0 }
      },
      {
        $replaceRoot: { newRoot: "$chats" }
      }, 
      {
        $sort: {date : 1}
      }
    ]).then((chats) => resolve(chats)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}
const allChats = (classId: string, subject: string): Promise<Chats[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.aggregate([
      {
        $match: { classId : classId }
      },
      {
        $unwind: "$chats"
      },
      {
        $match: { "chats.subject": subject }
      },
      {
        $project: { "chats": 1, "_id": 0 }
      },
      {
        $replaceRoot: { newRoot: "$chats" }
      }, 
      {
        $sort: {date : 1}
      }
    ]).then((chats) => resolve(chats)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const allStudents = (department: string, semester : string) => {
  return new Promise((resolve, reject) => {
    classModel.findOne({department : department, semester : semester}, {_id : 0, students : 1, sem : 1, collegeId : 1, course : 1}).then((students) => resolve(students)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

export default { createClass, fetchClassDetails, newChat, allChats, allStudents, teacherAllChats }