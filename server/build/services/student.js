"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const student_application_model_1 = require("../models/student_application_model");
const student_model_1 = require("../models/student_model");
const moment_1 = __importDefault(require("moment"));
const createStudentAllotment = (body) => {
    return new Promise((resolve, reject) => {
        student_application_model_1.studentApplicationModel.create(body).then(() => resolve()).catch((err) => { console.log(err); reject(http_errors_1.default.InternalServerError()); });
    });
};
const allStudentAllotmentThisYear = () => {
    const oneYearAgo = (0, moment_1.default)(new Date).year();
    const date = (0, moment_1.default)(oneYearAgo + "0101", "YYYYMMDD").toDate();
    console.log(date);
    console.log(oneYearAgo);
    return new Promise((resolve, reject) => {
        student_application_model_1.studentApplicationModel.find({ date: { $gte: date } }).then((applications) => resolve(applications)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchAStudentApplicant = (_id) => {
    return new Promise((resolve, reject) => {
        student_application_model_1.studentApplicationModel.findById(_id, { isBlocked: 1 }).then((application) => resolve(application)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const invertBlockStudentApplication = (_id, isBlocked) => {
    return new Promise((resolve, reject) => {
        student_application_model_1.studentApplicationModel.updateOne({ _id: _id }, { $set: { isBlocked: !isBlocked } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const createStudent = (body) => {
    return new Promise((resolve, reject) => {
        student_model_1.studentModel.create(body).then(() => resolve()).catch((err) => {
            if (err.code === 11000) {
                reject(http_errors_1.default.Conflict("User is already registered"));
            }
            else {
                reject(http_errors_1.default.InternalServerError());
            }
        });
    });
};
const fetchStudents = () => {
    return new Promise((resolve, reject) => {
        student_model_1.studentModel.find().lean().then((students) => resolve(students)).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const blockStudents = (email, isBlocked) => {
    return new Promise((resolve, reject) => {
        student_model_1.studentModel.updateOne({ email: email }, { $set: { isBlocked: !isBlocked } }).then(() => resolve()).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchAStudentDetails = (email) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        student_model_1.studentModel.findOne({ email: email }).then((student) => student ? resolve(student) : reject(http_errors_1.default.NotFound("Student not found"))).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const getStudentBlockStatus = (email) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        student_model_1.studentModel.findOne({ email: email }, { isBlocked: 1 }).then((student) => student ? resolve(student) : reject(http_errors_1.default.NotFound("Student is not found"))).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const getStudentApplicationAfterDate = (date) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        student_application_model_1.studentApplicationModel.find({ date: { $gt: date } }).then((studentApplication) => resolve(studentApplication)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchStudenAllotementDetails = (email) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        student_application_model_1.studentApplicationModel.findOne({ email: email }).lean().then((student) => resolve(student)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = {
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
