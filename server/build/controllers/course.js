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
const course_1 = __importDefault(require("../services/course"));
const validation_1 = __importDefault(require("../services/validation"));
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("create department");
        yield validation_1.default.isCourseSchemaValid(req.body);
        yield course_1.default.createCourse(req.body);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const allCourses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let courses = yield course_1.default.fetchAllCourse();
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const course = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        let course = yield course_1.default.fetchACourse(name);
        res.status(200).json(course);
    }
    catch (err) {
        let error = err;
        res.status(error.status || 500).json(error.message || "Internal Server Error");
    }
});
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        yield validation_1.default.isCourseSchemaValid(req.body);
        yield course_1.default.updateCourse(_id, req.body);
        res.status(200).json(course);
    }
    catch (err) {
        let error = err;
        res.status(error.status || 500).json(error.message || "Internal Server Error");
    }
});
exports.default = { createCourse, allCourses, course, updateCourse };
