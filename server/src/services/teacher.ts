import createHttpError from "http-errors";
import { Teacher, teacherModel } from "../models/teacher_model";
import { resolve } from "path";

const createTeacher = (body : Teacher): Promise<void> => {
  return new Promise((resolve, reject) => {
    teacherModel.create(body).then(() => resolve()).catch((err) => {
      console.log(err);
       if(err.code === 11000) {
        reject(createHttpError.Conflict("Teacher is already registered"))
      } else {
        reject(createHttpError.InternalServerError()) 
      }
    })
  })  
}

const fetchApprovedTeachers = (collegeId : string): Promise<Teacher> => {
  return new Promise((resolve, reject) => {
    teacherModel.find({collegeId : collegeId, isApproved : true}).lean().then((teachers) => {
      //@ts-ignore
      resolve(teachers)
    }).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchApplications = (collegeId : string): Promise<Teacher> => {
  return new Promise((resolve, reject) => {
    teacherModel.find({isApproved : false, collegeId : collegeId}).lean().then((teachers) => {
      //@ts-ignore
      resolve(teachers)
    }).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const approveApplication = (email : string):Promise<void> => {
  return new Promise((resolve, reject) => {
    teacherModel.updateOne({email : email}, {$set : { isApproved : true}}).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchATeacher = (email : string) : Promise<Teacher> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    teacherModel.findOne({email : email}).lean().then((teacher) =>{
      //@ts-ignore
      teacher ? resolve(teacher) : reject(createHttpError.NotFound("Email not found"))
    }).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const blockTeacher = (email : string, isBlocked : boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    teacherModel.updateOne({email : email}, {$set : { isBlocked : !isBlocked}}).then(() => resolve()).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    }) 
  })
}

export default {createTeacher, fetchApprovedTeachers, fetchApplications, approveApplication, blockTeacher, fetchATeacher}