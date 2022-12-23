import createHttpError from "http-errors";
import { College, Department, collegeModel } from "../models/college_model";
import { setMaxIdleHTTPParsers } from "http";

const createCollege = (body: College): Promise<void> => {
  return new Promise((resolve, reject) => {
    collegeModel.create(body).then(() => resolve()).catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        reject(createHttpError.Conflict("College ID needs to be unique"))
      } else {
        reject(createHttpError.InternalServerError())
      }
    })
  })
}

const fetchApprovedCollege = () => {
  return new Promise((resolve, reject) => {
    collegeModel.find({ isApproved: true }).then((colleges) => resolve(colleges)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError());
    })
  })
}

const invertApproval = (collegeId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      let college = await collegeModel.findOne({ collegeId: collegeId }, { isApproved: 1 });
      if (!college) throw createHttpError.NotFound("CollegeId is invalid");
      await collegeModel.updateOne({ collegeId: collegeId }, { $set: { isApproved: !college?.isApproved } });
      resolve();
    } catch (err: any) {
      console.log(err);
      if (err.status === 404) {
        reject(createHttpError.NotFound("CollegeId is invalid"))
      } else {
        reject(createHttpError.InternalServerError());
      }
    }
  })
}

const fetchAllCollege = (): Promise<College[]> => {
  return new Promise((resolve, reject) => {
    //@ts-ignore
    collegeModel.find().then((colleges) => resolve(colleges)).catch((err) => {
      console.log(err);
      reject(createHttpError.InternalServerError());
    })
  })
}


const fetchACollege = (collegeId: string): Promise<College> => {
  return new Promise((resolve, reject) => {
    collegeModel.findOne({ collegeId: collegeId.toUpperCase() }).lean().then((collegeDoc) => {
      if (!collegeDoc) reject(createHttpError.NotFound("College Not Found"))
      //@ts-ignore
      resolve(collegeDoc)
    }).catch((err) => {
      console.log(err)
    })
  })
}

const fetchAllDepartment = (collegeId: string): Promise<any> => {
  return new Promise((resolve, reject) => {//, "department.semesters" : 0
    collegeModel.findOne({ collegeId: collegeId.toUpperCase() }, { department: 1 }).then((department) => {
      if (!department) reject(createHttpError.NotFound("collegeId not found"))
      else resolve(department)
    }).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}


const fetchADepartment = (collegeId: string, department: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    collegeModel.findOne({ collegeId: collegeId.toUpperCase(), department: { $elemMatch: { name: department } } }, { "department.$": 1 }).then((department) => {
      if (!department) reject(createHttpError.NotFound("collegeId not found"))
      else resolve(department)
    }).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const updateDepartment = (collegeId: string, body: Department): Promise<void> => {
  return new Promise((resolve, reject) => {
    const department = body.name
    collegeModel.updateOne(
      { collegeId: collegeId.toUpperCase() },
      { $set: { "department.$[i]": body } },
      { arrayFilters: [{ "i.name": department }] }
    ).then(() => resolve()).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    }
    )
  })
}

const createCourse = (collegeId: string, department: Department): Promise<void> => {
  return new Promise((resolve, reject) => {
    collegeModel.updateOne({ collegeId: collegeId }, { $push: { department: department } }).then(() => resolve()).catch(err => {
      console.log(err);
      reject(createHttpError.InternalServerError())
    })
  })
}

const getStudentSubjects = (department: string, sem: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    collegeModel.aggregate([
      {
        $match: {
          "department.name": department,
          "department.semesters.sem": sem
        }
      },
      {
        $unwind: "$department"
      },
      {
        $unwind: "$department.semesters"
      },
      {
        $match: {
          "department.semesters.sem": 2
        }
      },
      {
        $project: {
          _id: 0,
          subjects: "$department.semesters.subjects"
        }
      }
    ]).then((subjects) => resolve(subjects[0])).catch(err => {
      console.log(err)
      reject(createHttpError.InternalServerError())
    })
  })
}

const getAllTeachingSubjects = (name: string) => {
  return new Promise((resolve, reject) => {
    collegeModel.aggregate([
      {
        $unwind: "$department"
      },
      {
        $unwind: "$department.semesters"
      },
      {
        $unwind: "$department.semesters.subjects"
      },
      {
        $match: {
          "department.semesters.subjects.teacher": name
        }
      },
      {
        $project: {
          _id: 0,
          department: "$department.name",
          semester: "$department.semesters.sem",
          subject: "$department.semesters.subjects.name"
        }
      }
    ]).then((teachingSubjects) => resolve(teachingSubjects)).catch(err => {
        console.log(err)
        reject(createHttpError.InternalServerError())
      })
  })
}

export default { createCollege, fetchApprovedCollege, invertApproval, fetchAllCollege, fetchACollege, fetchAllDepartment, createCourse, fetchADepartment, updateDepartment, getStudentSubjects, getAllTeachingSubjects }