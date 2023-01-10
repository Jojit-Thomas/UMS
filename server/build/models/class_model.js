"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants/constants");
const studentSchema = new mongoose_1.default.Schema({
    name: String,
    email: String
}, { _id: false });
const chatSchema = new mongoose_1.default.Schema({
    name: String,
    userId: mongoose_1.Types.ObjectId,
    subject: String,
    date: Date,
    message: String
}, { _id: false });
const eventSchema = new mongoose_1.default.Schema({
    message: String,
    subject: String,
    url: String,
    date: {
        type: Date,
        default: new Date()
    }
}, { _id: false });
const classSchema = new mongoose_1.default.Schema({
    year: Number,
    course: String,
    classTeacher: String,
    collegeId: String,
    classId: {
        type: String,
        unique: true
    },
    sem: Number,
    students: [studentSchema],
    chats: [chatSchema],
    events: [eventSchema],
});
exports.classModel = mongoose_1.default.model("classModel", classSchema, constants_1.CLASS_COLLECTION);
