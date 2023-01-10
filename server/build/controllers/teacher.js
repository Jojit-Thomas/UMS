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
const teacher_1 = __importDefault(require("../services/teacher"));
const validation_1 = __importDefault(require("../services/validation"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const college_1 = __importDefault(require("../services/college"));
const class_1 = __importDefault(require("../services/class"));
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validation_1.default.isTeacherSchemaValid(req.body);
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        yield teacher_1.default.createTeacher(req.body);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const fetchTeachers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("kajklsjdfkljaklsjdfklklajsldf");
        console.log("teacher : ", req.college);
        //@ts-ignore
        const collegeId = req.college.aud;
        if (!collegeId)
            throw http_errors_1.default.InternalServerError();
        let teachers = yield teacher_1.default.fetchApprovedTeachers(collegeId);
        res.status(200).json(teachers);
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const fetchPendingApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const collegeId = req.college.aud;
        if (!collegeId)
            throw http_errors_1.default.InternalServerError();
        let applications = yield teacher_1.default.fetchApplications(collegeId);
        res.status(200).json(applications);
    }
    catch (err) {
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const approveApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            throw http_errors_1.default.BadRequest("Email is required");
        yield teacher_1.default.approveApplication(email);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const fetchATeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const { email } = req.params;
        if (!email)
            throw http_errors_1.default.BadRequest("email param is required");
        let teacher = yield teacher_1.default.fetchATeacher(email);
        res.status(200).json(teacher);
    }
    catch (err) {
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const blockTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const { email } = req.body;
        if (!email)
            throw http_errors_1.default.BadRequest("email param is required");
        let { isBlocked } = yield teacher_1.default.fetchATeacher(email);
        yield teacher_1.default.blockTeacher(email, isBlocked);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.status === 500 ? "Intenal Server Error" : err.message);
    }
});
const allClasses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let classes = yield college_1.default.getAllTeachingSubjects(req.teacher.aud);
        res.status(200).json(classes);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const getAllChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department, subject, semester } = req.params;
        const { collegeId } = req.teacher;
        console.log(collegeId, department, subject, parseInt(semester));
        let chats = yield class_1.default.teacherAllChats(collegeId, department, subject, parseInt(semester));
        console.log(chats);
        res.status(200).json(chats);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department, subject, semester } = req.params;
        const { collegeId } = req.teacher;
        let chats = yield class_1.default.teacherAllEvents(collegeId, department, subject, parseInt(semester));
        console.log(chats);
        res.status(200).json(chats);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const newChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.teacher);
        const { message, subject, classId } = req.body;
        let chat = {
            name: req.teacher.name,
            userId: req.teacher.id,
            date: new Date,
            subject: subject,
            message: message
        };
        yield class_1.default.newChat(classId, chat);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const allPeople = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { department, subject, semester } = req.params;
        const { collegeId } = req.teacher;
        console.log("subject : ", subject);
        let students = yield class_1.default.findAllStudents(collegeId, department, semester);
        //@ts-ignore
        // let teachers = await collegeDB.findTeacherInClass(students.collegeId, student.course, students.sem, subject)
        // console.log(teachers)
        res.status(200).json({ details: students, teachers: req.teacher.aud });
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const newEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // :department/:subject/:semester
        const { department, semester } = req.params;
        const { collegeId } = req.teacher;
        yield class_1.default.newEvent(collegeId, department, parseInt(semester), req.body);
        res.sendStatus(204);
    }
    catch (err) {
        let error = err;
        res.status(error.status || 500).json(error.message || "Internal server error");
    }
});
exports.default = { createTeacher, fetchTeachers, fetchPendingApplication, approveApplication, fetchATeacher, blockTeacher, allClasses, getAllChats, newChat, allPeople, newEvent, getAllEvents };
