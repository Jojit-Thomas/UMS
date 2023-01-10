"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const course_model_1 = require("../models/course_model");
const createCourse = (body) => {
    return new Promise((resolve, reject) => {
        course_model_1.courseModel.create(body).then(() => resolve()).catch((err) => {
            console.log(err);
            if (err.code === 11000) {
                reject(http_errors_1.default.Conflict("Deaparment already registered"));
            }
            else {
                reject(http_errors_1.default.InternalServerError());
            }
        });
    });
};
const fetchAllCourse = () => {
    return new Promise((resolve, reject) => {
        course_model_1.courseModel.find().lean().then((departments) => resolve(departments)).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchACourse = (name) => {
    return new Promise((resolve, reject) => {
        course_model_1.courseModel.findOne({ name: name }).lean().then((course) => {
            if (course)
                resolve(course);
            else
                reject(http_errors_1.default.NotFound("Course not Found"));
        });
    });
};
const updateCourse = (id, body) => {
    return new Promise((resolve, reject) => {
        course_model_1.courseModel.updateOne({ _id: id }, { $set: body }).then(() => resolve()).catch((err) => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = { createCourse, fetchAllCourse, fetchACourse, updateCourse };
