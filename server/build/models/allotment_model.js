"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allotmentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants/constants");
const selectedStudentsSchema = new mongoose_1.default.Schema({
    collegeId: String,
    course: String,
    name: String,
    email: String
}, { _id: false });
const allotmentSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        default: new Date
    },
    selectedSutdents: [selectedStudentsSchema]
});
exports.allotmentModel = mongoose_1.default.model("allotmentModel", allotmentSchema, constants_1.ALLOTMENT_COLLECTION);
