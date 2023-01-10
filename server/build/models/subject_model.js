"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants/constants");
const subjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true
    }
});
exports.subjectModel = mongoose_1.default.model("subjectModel", subjectSchema, constants_1.SUBJECTS_COLLECTION);
