"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const college_model_1 = require("../models/college_model");
const createCollege = (body) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.create(body).then(() => resolve()).catch((err) => {
            console.error(err);
            if (err.code === 11000) {
                reject(http_errors_1.default.Conflict("College ID needs to be unique"));
            }
            else {
                reject(http_errors_1.default.InternalServerError());
            }
        });
    });
};
const fetchApprovedCollege = () => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.find({ isApproved: true }).then((colleges) => resolve(colleges)).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const invertApproval = (collegeId) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let college = yield college_model_1.collegeModel.findOne({ collegeId: collegeId }, { isApproved: 1 });
            if (!college)
                throw http_errors_1.default.NotFound("CollegeId is invalid");
            yield college_model_1.collegeModel.updateOne({ collegeId: collegeId }, { $set: { isApproved: !(college === null || college === void 0 ? void 0 : college.isApproved) } });
            resolve();
        }
        catch (err) {
            console.log(err);
            if (err.status === 404) {
                reject(http_errors_1.default.NotFound("CollegeId is invalid"));
            }
            else {
                reject(http_errors_1.default.InternalServerError());
            }
        }
    }));
};
const fetchAllCollege = () => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        college_model_1.collegeModel.find().then((colleges) => resolve(colleges)).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchACollege = (collegeId) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.findOne({ collegeId: collegeId.toUpperCase() }).lean().then((collegeDoc) => {
            if (!collegeDoc)
                reject(http_errors_1.default.NotFound("College Not Found"));
            //@ts-ignore
            resolve(collegeDoc);
        }).catch((err) => {
            console.log(err);
        });
    });
};
const fetchAllDepartment = (collegeId) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.findOne({ collegeId: collegeId.toUpperCase() }, { department: 1 }).then((department) => {
            if (!department)
                reject(http_errors_1.default.NotFound("collegeId not found"));
            else
                resolve(department);
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchADepartment = (collegeId, department) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.findOne({ collegeId: collegeId.toUpperCase(), department: { $elemMatch: { name: department } } }, { "department.$": 1 }).then((department) => {
            if (!department)
                reject(http_errors_1.default.NotFound("collegeId not found"));
            else
                resolve(department);
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const updateDepartment = (collegeId, body) => {
    return new Promise((resolve, reject) => {
        const department = body.name;
        college_model_1.collegeModel.updateOne({ collegeId: collegeId.toUpperCase() }, { $set: { "department.$[i]": body } }, { arrayFilters: [{ "i.name": department }] }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const createCourse = (collegeId, department) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.updateOne({ collegeId: collegeId }, { $push: { department: department } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const getStudentSubjects = (department, sem, collegeId) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.aggregate([
            {
                $match: {
                    collegeId: collegeId,
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
                    "department.semesters.sem": sem
                }
            },
            {
                $project: {
                    _id: 0,
                    subjects: "$department.semesters.subjects"
                }
            }
        ]).then((subjects) => {
            // console.log(subjects)
            resolve(subjects[0]);
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const getAllTeachingSubjects = (name) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.aggregate([
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
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const findTeacherInClass = (collegeId, course, sem, subject) => {
    return new Promise((resolve, reject) => {
        college_model_1.collegeModel.aggregate([
            {
                $match: { collegeId: collegeId }
            },
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
                    "department.name": course,
                    "department.semesters.sem": sem,
                    "department.semesters.subjects.name": subject
                }
            },
            {
                $project: {
                    _id: 0,
                    teacher: "$department.semesters.subjects.teacher"
                }
            }
        ]).then((teachers) => resolve(teachers)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = { createCollege, fetchApprovedCollege, invertApproval, fetchAllCollege, fetchACollege, fetchAllDepartment, createCourse, fetchADepartment, updateDepartment, getStudentSubjects, getAllTeachingSubjects, findTeacherInClass };
