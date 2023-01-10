import createHttpError from "http-errors"
import { Chats, ClassEvents, ClassType, classModel } from "../models/class_model"

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

const teacherAllChats = (collegeId : string, course: string, subject: string, semester : number): Promise<Chats[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.aggregate([
      {
        $match: { collegeId : collegeId, course: course, sem : semester }
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

const teacherAllEvents = (collegeId : string, course: string, subject: string, semester : number): Promise<Chats[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.aggregate([
      {
        $match: { collegeId: collegeId, course: course, sem : semester }
      },
      {
        $unwind: "$events"
      },
      {
        $match: { "events.subject": subject } 
      },
      {
        $project: { "events": 1, "_id": 0 }
      },
      {
        $replaceRoot: { newRoot: "$events" }
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

const findAllStudents = ( collegeId : string, department: string, semester : string) => {
  return new Promise((resolve, reject) => {
    classModel.findOne({ collegeId : collegeId, course : department, semester : semester}, {_id : 0, classId : 1,  students : 1, sem : 1, collegeId : 1, course : 1}).then((students) => resolve(students)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const findAllStudentsByClassId = ( classId : string) => {
  return new Promise((resolve, reject) => {
    classModel.findOne({ classId : classId}, {_id : 0, students : 1, sem : 1, collegeId : 1, course : 1}).then((students) => resolve(students)).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const newEvent = (collegeId : string, department : string, semester : number, body : ClassEvents): Promise<void> => {
  return new Promise((resolve, reject) => {
    classModel.updateOne({collegeId : collegeId, course : department, sem : semester  }, {$push : {events : body}}).then(() => resolve()).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const allEvents = (classId: string, subject: string): Promise<Chats[]> => {
  // console.log("class : : ; : : ", classId, subject)
  return new Promise((resolve, reject) => {
    //@ts-ignore
    classModel.aggregate([
      {
        $match: { classId : classId }
      },
      {
        $unwind: "$events"
      },
      {
        $match: { "events.subject": subject }
      },
      {
        $project: { "events": 1, "_id": 0 }
      },
      {
        $replaceRoot: { newRoot: "$events" }
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

export default { createClass, fetchClassDetails, newChat, allChats, findAllStudents, findAllStudentsByClassId, teacherAllChats, newEvent, allEvents, teacherAllEvents }