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
const college_1 = __importDefault(require("../services/college"));
const validation_1 = __importDefault(require("../services/validation"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const course_1 = __importDefault(require("../services/course"));
const college_2 = __importDefault(require("../services/college"));
const moment_1 = __importDefault(require("moment"));
function convertObject(obj) {
    //@ts-ignore
    obj.semesters.forEach(semester => semester.subjects = semester.subjects.map(subject => ({ name: subject, teacher: null })));
    delete obj._id;
    return obj;
}
const createCollege = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.isCollegeSchemaValid(req.body);
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        let department = req.body.department;
        req.body.department = [];
        yield college_1.default.createCollege(req.body);
        department.forEach((elem) => __awaiter(void 0, void 0, void 0, function* () {
            let course = yield course_1.default.fetchACourse(elem.ref);
            course = convertObject(course);
            course.maxCandidate = elem.maxCandidate;
            course.seats = [{ year: (0, moment_1.default)(new Date).year(), seats: req.body.maxCandidate }];
            yield college_1.default.createCourse(req.body.collegeId, course);
        }));
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const fetchApprovedCollege = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let colleges = yield college_1.default.fetchApprovedCollege();
        res.status(200).json(colleges);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const fetchAllDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const collegeId = req.college.aud;
        if (!collegeId)
            throw http_errors_1.default.InternalServerError();
        let department = yield college_1.default.fetchAllDepartment(collegeId);
        res.status(200).json(department);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const inverteApproval = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.collegeId)
            throw http_errors_1.default.BadRequest("collegeId is required : body");
        yield college_1.default.invertApproval(req.body.collegeId);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const fetchAllCollege = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let college = yield college_1.default.fetchAllCollege();
        res.status(200).json(college);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const newDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const collegeId = req.college.aud;
        if (!collegeId)
            throw http_errors_1.default.InternalServerError();
        req.body.seats = [{ year: (0, moment_1.default)(new Date).year(), seats: req.body.maxCandidate }];
        yield college_1.default.createCourse(collegeId, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const fetchADepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const collegeId = req.college.aud;
        const { department } = req.params;
        if (!collegeId || !department)
            throw http_errors_1.default.InternalServerError();
        let departmentObj = yield college_1.default.fetchADepartment(collegeId, department);
        console.log(departmentObj);
        res.status(200).json(departmentObj);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
const updateDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const collegeId = req.college.aud;
        if (!collegeId)
            throw http_errors_1.default.InternalServerError();
        yield college_2.default.updateDepartment(collegeId, req.body);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Sever Error");
    }
});
exports.default = { createCollege, fetchApprovedCollege, inverteApproval, fetchAllCollege, fetchAllDepartment, newDepartment, fetchADepartment, updateDepartment };
