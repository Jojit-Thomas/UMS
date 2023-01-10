"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const teacher_model_1 = require("../models/teacher_model");
const createTeacher = (body) => {
    return new Promise((resolve, reject) => {
        teacher_model_1.teacherModel.create(body).then(() => resolve()).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                reject(http_errors_1.default.Conflict("Teacher is already registered"));
            }
            else {
                reject(http_errors_1.default.InternalServerError());
            }
        });
    });
};
const fetchApprovedTeachers = (collegeId) => {
    return new Promise((resolve, reject) => {
        teacher_model_1.teacherModel.find({ collegeId: collegeId, isApproved: true }).lean().then((teachers) => {
            //@ts-ignore
            resolve(teachers);
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchApplications = (collegeId) => {
    return new Promise((resolve, reject) => {
        teacher_model_1.teacherModel.find({ isApproved: false, collegeId: collegeId }).lean().then((teachers) => {
            //@ts-ignore
            resolve(teachers);
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const approveApplication = (email) => {
    return new Promise((resolve, reject) => {
        teacher_model_1.teacherModel.updateOne({ email: email }, { $set: { isApproved: true } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchATeacher = (email) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        teacher_model_1.teacherModel.findOne({ email: email }).lean().then((teacher) => {
            //@ts-ignore
            teacher ? resolve(teacher) : reject(http_errors_1.default.NotFound("Email not found"));
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const blockTeacher = (email, isBlocked) => {
    return new Promise((resolve, reject) => {
        teacher_model_1.teacherModel.updateOne({ email: email }, { $set: { isBlocked: !isBlocked } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = { createTeacher, fetchApprovedTeachers, fetchApplications, approveApplication, blockTeacher, fetchATeacher };
