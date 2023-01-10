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
exports.teacherModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants/constants");
const teacherSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        default: new mongoose_1.Types.ObjectId
    },
    name: String,
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
    contact: String,
    password: String,
    subject: String,
    classTeacher: mongoose_1.Types.ObjectId,
    qualification: String,
    collegeId: String,
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE']
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    DOB: Date,
    skills: String,
    totalMark: Number,
    expereience: String,
}, { _id: false });
exports.teacherModel = mongoose_1.default.model("teacherModel", teacherSchema, constants_1.TEACHERS_COLLECTION);
