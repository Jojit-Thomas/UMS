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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collegeModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const constants_1 = require("../constants/constants");
const moment_1 = __importDefault(require("moment"));
console.log(new mongoose_1.Types.ObjectId);
const departmentSchema = new mongoose_1.default.Schema({
    name: String,
    qualification: String,
    maxCandidate: Number,
    semesters: [{
            sem: Number,
            subjects: [{
                    name: String,
                    teacher: String
                }]
        }],
    seats: {
        type: Array,
        default: [{ year: (0, moment_1.default)(new Date).year(), seats: 0 }]
    }
}, { _id: false });
const collegeSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    collegeId: {
        type: String,
        unique: true
    },
    password: String,
    contact: String,
    address: String,
    place: String,
    university: mongoose_1.Types.ObjectId,
    department: [departmentSchema],
    isApproved: {
        type: Boolean,
        default: false,
    },
});
exports.collegeModel = mongoose_1.default.model("collegeModel", collegeSchema, constants_1.COLLEGE_COLLECTION);
