"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const subject_model_1 = require("../models/subject_model");
const createSubject = (body) => {
    return new Promise((resolve, reject) => {
        subject_model_1.subjectModel.create(body).then(() => resolve()).catch((err) => {
            if (err.code === 11000) {
                reject(http_errors_1.default.Conflict("Subject is already registered"));
            }
            else {
                console.log(err);
                reject(http_errors_1.default.InternalServerError());
            }
        });
    });
};
exports.default = { createSubject };
