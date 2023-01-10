"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const class_model_1 = require("../models/class_model");
const createClass = (body) => {
    return new Promise((resolve, reject) => {
        class_model_1.classModel.create(body).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const fetchClassDetails = (classId) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        class_model_1.classModel.findOne({ classId: classId }).then((classDoc) => resolve(classDoc)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const newChat = (classId, chats) => {
    return new Promise((resolve, reject) => {
        class_model_1.classModel.updateOne({ classId: classId }, { $push: { chats: chats } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const teacherAllChats = (collegeId, course, subject, semester) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        class_model_1.classModel.aggregate([
            {
                $match: { collegeId: collegeId, course: course, sem: semester }
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
                $sort: { date: 1 }
            }
        ]).then((chats) => resolve(chats)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const teacherAllEvents = (collegeId, course, subject, semester) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        class_model_1.classModel.aggregate([
            {
                $match: { collegeId: collegeId, course: course, sem: semester }
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
                $sort: { date: 1 }
            }
        ]).then((chats) => resolve(chats)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const allChats = (classId, subject) => {
    return new Promise((resolve, reject) => {
        //@ts-ignore
        class_model_1.classModel.aggregate([
            {
                $match: { classId: classId }
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
                $sort: { date: 1 }
            }
        ]).then((chats) => resolve(chats)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const findAllStudents = (collegeId, department, semester) => {
    return new Promise((resolve, reject) => {
        class_model_1.classModel.findOne({ collegeId: collegeId, course: department, semester: semester }, { _id: 0, classId: 1, students: 1, sem: 1, collegeId: 1, course: 1 }).then((students) => resolve(students)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const findAllStudentsByClassId = (classId) => {
    return new Promise((resolve, reject) => {
        class_model_1.classModel.findOne({ classId: classId }, { _id: 0, students: 1, sem: 1, collegeId: 1, course: 1 }).then((students) => resolve(students)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const newEvent = (collegeId, department, semester, body) => {
    return new Promise((resolve, reject) => {
        class_model_1.classModel.updateOne({ collegeId: collegeId, course: department, sem: semester }, { $push: { events: body } }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
const allEvents = (classId, subject) => {
    // console.log("class : : ; : : ", classId, subject)
    return new Promise((resolve, reject) => {
        //@ts-ignore
        class_model_1.classModel.aggregate([
            {
                $match: { classId: classId }
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
                $sort: { date: 1 }
            }
        ]).then((chats) => resolve(chats)).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = { createClass, fetchClassDetails, newChat, allChats, findAllStudents, findAllStudentsByClassId, teacherAllChats, newEvent, allEvents, teacherAllEvents };
