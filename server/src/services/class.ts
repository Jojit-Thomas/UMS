import createHttpError from "http-errors"
import { Chats, ClassType, classModel } from "../models/class_model"

const createClass = (body: ClassType):Promise<void> => {
  return new Promise((resolve, reject) => {
    classModel.create(body).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchClassDetails = (classId : string):Promise<ClassType> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.findOne({classId : classId}).then((classDoc) => resolve(classDoc)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const newChat = (classId : string, chats : Chats):Promise<void> => {
  return new Promise((resolve, reject) => {
    classModel.updateOne({classId : classId}, {$set : {chats : chats}}).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

export default {createClass, fetchClassDetails, newChat}