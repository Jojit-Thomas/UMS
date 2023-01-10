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
// const createHttpError = require("http-errors");
const http_errors_1 = __importDefault(require("http-errors"));
// const Joi = require("joi");
const joi_1 = __importDefault(require("joi"));
const studentSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(30).required(),
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net"] },
    }).required(),
    phone: joi_1.default.string().min(10).max(10).required(),
    DOB: joi_1.default.string().required(),
    address: joi_1.default.string().min(4).max(50).required(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE').required(),
    isBlocked: joi_1.default.boolean(),
    batch: joi_1.default.string().required(),
    attendence: joi_1.default.array().required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});
const studentApplicationFormSchema = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(30).required(),
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net"] },
    }).required(),
    educationalQualification: joi_1.default.string().required(),
    password: joi_1.default.string().min(8).max(40).required(),
    contact: joi_1.default.string().pattern(/^[0-9]+$/).min(10).max(10).required(),
    address: joi_1.default.string().trim().min(10).max(100).required(),
    totalMark: joi_1.default.number().required(),
    admissionPreference: joi_1.default.array().required(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE').required(),
    DOB: joi_1.default.string().required(),
    markListLink: joi_1.default.string().required()
    // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).min(8).max(30).required(),
});
const collegeSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net"] },
    }),
    collegeId: joi_1.default.string().min(5).max(30).required(),
    contact: joi_1.default.string().min(10).max(10).required(),
    password: joi_1.default.string().min(8).max(40).required(),
    address: joi_1.default.string().min(3).max(60).required(),
    place: joi_1.default.string().required(),
    department: joi_1.default.array().required()
});
const teacherSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(50).required(),
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net"] },
    }),
    contact: joi_1.default.string().min(10).max(10).required(),
    password: joi_1.default.string().min(8).max(30).required(),
    subject: joi_1.default.string().required(),
    classTeacher: joi_1.default.string(),
    qualification: joi_1.default.string().required(),
    gender: joi_1.default.string().valid('MALE', 'FEMALE').required(),
    collegeId: joi_1.default.string().required(),
    address: joi_1.default.string().min(5).max(100).required(),
    totalMark: joi_1.default.number().required(),
    markListLink: joi_1.default.string().required(),
    DOB: joi_1.default.string().required(),
    skills: joi_1.default.string().required(),
    experience: joi_1.default.string().required(),
});
const courseSchema = joi_1.default.object({
    _id: joi_1.default.string(),
    name: joi_1.default.string().min(3).max(30).required(),
    qualification: joi_1.default.string().required(),
    semesters: joi_1.default.array().required(),
    __v: joi_1.default.number()
});
const isCreateStudentValid = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = yield studentSchema.validate(params, { abortEarly: false });
        if (error) {
            reject(http_errors_1.default.BadRequest(JSON.stringify(error.details)));
        }
        else {
            resolve(value);
        }
    }));
};
const isStudentApllicationFormValid = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = yield studentApplicationFormSchema.validate(params, { abortEarly: false });
        if (error) {
            reject(http_errors_1.default.BadRequest(JSON.stringify(error.details)));
        }
        else {
            resolve(value);
        }
    }));
};
const isCollegeSchemaValid = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = yield collegeSchema.validate(params, { abortEarly: false });
        if (error) {
            reject(http_errors_1.default.BadRequest(JSON.stringify(error.details)));
        }
        else {
            resolve(value);
        }
    }));
};
const isTeacherSchemaValid = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = yield teacherSchema.validate(params, { abortEarly: false });
        if (error) {
            reject(http_errors_1.default.BadRequest(JSON.stringify(error.details)));
        }
        else {
            resolve(value);
        }
    }));
};
const isCourseSchemaValid = (params) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { error, value } = yield courseSchema.validate(params, { abortEarly: false });
        if (error) {
            reject(http_errors_1.default.BadRequest(JSON.stringify(error.details)));
        }
        else {
            resolve(value);
        }
    }));
};
exports.default = { isCreateStudentValid, isStudentApllicationFormValid, isCollegeSchemaValid, isTeacherSchemaValid, isCourseSchemaValid };
