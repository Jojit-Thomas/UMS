"use strict";
// const model = {
//   year : 2020,
//   course : "B.Tech",
//   classTeacher : "John Doe", // class teacher name 
//   exams : [{
//     sem : 1,
//     question : "",
//     date : "2022-12-12",
//     registration_fees : 500
//   }]
// }
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
exports.courseModel = void 0;
// const course = {
//   name : "B.Tech",
//   qualification : "High School", // enum
//   semesters : [
//     {
//       sem : 1,
//       subjects : ["Maths","C Programming", "python"],
//     },
//     {
//       sem : 2,
//       subjects : ["English","C Programming", "python"],
//     },
//   ]
// }
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants/constants");
const courseSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        default: mongoose_1.Types.ObjectId
    },
    name: {
        type: String,
        unique: true
    },
    qualification: String,
    semesters: [{
            sem: Number,
            subjects: [String]
        }]
}, { _id: false });
exports.courseModel = mongoose_1.default.model("courseModel", courseSchema, constants_1.COURSE_COLLECTION);
