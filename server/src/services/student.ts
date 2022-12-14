import createHttpError from "http-errors";
import { resolve } from "path";
import { studentApplicationFormType, studentApplicationModel } from "../models/student_application_model";
import { Student, studentModel } from "../models/student_model";
import moment from "moment";

const createStudentAllotment = (body: studentApplicationFormType): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentApplicationModel.create(body).then(() => resolve()).catch((err) => { console.log(err); reject(createHttpError.InternalServerError()) })
  })
}

const allStudentAllotmentThisYear = () => {
  const oneYearAgo = moment(new Date).year();

  const date = moment(oneYearAgo + "0101", "YYYYMMDD").toDate()

  console.log(date)

  console.log(oneYearAgo)
  return new Promise((resolve, reject) => {
    studentApplicationModel.find({ date: { $gte: date } }).then((applications) => resolve(applications)).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchAStudentApplicant = (_id: string) => {
  return new Promise((resolve, reject) => {
    studentApplicationModel.findById(_id, { isBlocked: 1 }).then((application) => resolve(application)).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const invertBlockStudentApplication = (_id: string, isBlocked: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentApplicationModel.updateOne({ _id: _id }, { $set: { isBlocked: !isBlocked } }).then(() => resolve()).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const createStudent = (body: Student): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentModel.create(body).then(() => resolve()).catch((err) => {
      if (err.code === 11000) {
        reject(createHttpError.Conflict("User is already registered"))
      } else {
        reject(createHttpError.InternalServerError())
      }
    })
  })
}

const fetchStudents = () => {
  return new Promise((resolve, reject) => {
    studentModel.find().lean().then((students) => resolve(students)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}


const blockStudents = (email: String, isBlocked: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    studentModel.updateOne({ email: email }, { $set: { isBlocked: !isBlocked } }).then(() => resolve()).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchAStudentDetails = (email: String): Promise<Student> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    studentModel.findOne({ email: email }).then((student) => student ? resolve(student) : reject(createHttpError.NotFound("Student not found"))).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const getStudentBlockStatus = (email: String): Promise<{ _id: String, isBlocked: boolean }> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    studentModel.findOne({ email: email }, { isBlocked: 1 }).then((student) => student ? resolve(student) : reject(createHttpError.NotFound("Student is not found"))).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const getStudentApplicationAfterDate = (date: Date): Promise<studentApplicationFormType[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    studentApplicationModel.find({ date: { $gt: date } }).then((studentApplication) => resolve(studentApplication)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const fetchStudenAllotementDetails = (email: string): Promise<studentApplicationFormType> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    studentApplicationModel.findOne({ email: email }).lean().then((student) => resolve(student)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

export default {
  createStudentAllotment,
  createStudent,
  fetchStudents,
  blockStudents,
  fetchAStudentDetails,
  getStudentBlockStatus,
  getStudentApplicationAfterDate,
  fetchStudenAllotementDetails,
  allStudentAllotmentThisYear,
  fetchAStudentApplicant,
  invertBlockStudentApplication
};