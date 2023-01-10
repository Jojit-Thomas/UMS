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
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const razorpay_1 = __importDefault(require("razorpay"));
const http_errors_1 = __importDefault(require("http-errors"));
const student_1 = __importDefault(require("../services/student"));
const validation_1 = __importDefault(require("../services/validation"));
const college_1 = __importDefault(require("../services/college"));
const class_1 = __importDefault(require("../services/class"));
const allotment_1 = require("../services/allotment");
dotenv_1.default.config();
var instance = new razorpay_1.default({
    key_id: 'rzp_test_8JLZOZRODQ9Mpc',
    key_secret: process.env.RAZOR_PAY_SECRET,
});
const createStudentAllotment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        yield validation_1.default.isStudentApllicationFormValid(req.body);
        req.body.DOB = (0, moment_1.default)(req.body.DOB);
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        yield student_1.default.createStudentAllotment(req.body);
        res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});
const createStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        yield validation_1.default.isCreateStudentValid(req.body);
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        yield student_1.default.createStudent(req.body);
        res.sendStatus(204);
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err);
    }
});
const allStudents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let students = yield student_1.default.fetchStudents();
        res.status(200).json(students);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message);
    }
});
const blockStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email)
            throw http_errors_1.default.BadRequest("email param is required");
        const { isBlocked } = yield student_1.default.getStudentBlockStatus(email);
        yield student_1.default.blockStudents(email, isBlocked);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message);
    }
});
const getAStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        if (!email)
            throw http_errors_1.default.BadRequest("Email is required");
        let studentDetails = yield student_1.default.fetchAStudentDetails(email);
        res.status(200).json(studentDetails);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message);
    }
});
const admissionPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var options = {
            amount: 5000,
            currency: "INR",
            receipt: `order_${Date.now()}_${Math.random()}`
        };
        instance.orders.create(options, function (err, order) {
            console.log(err);
            if (err)
                throw http_errors_1.default.InternalServerError();
            res.status(200).json(order);
        });
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const allSubjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        //@ts-ignore
        let { sem, collegeId } = yield class_1.default.fetchClassDetails(req.user.classId);
        //@ts-ignore
        let subjects = yield college_1.default.getStudentSubjects(req.user.course, sem, collegeId);
        console.log(subjects);
        res.status(200).json(subjects);
        // res.send("All subjects will be provided")
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const allotment = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let date = (0, moment_1.default)(new Date).subtract(1, "year").toDate();
        console.log(date);
        let studentApplication = yield student_1.default.getStudentApplicationAfterDate(date);
        let colleges = yield college_1.default.fetchAllCollege();
        let { selectedStudents, rejectedStudents } = assignToCollege(studentApplication, colleges);
        let classes = assignToClass(selectedStudents);
        classes.forEach((elem) => __awaiter(void 0, void 0, void 0, function* () {
            yield class_1.default.createClass(elem);
            // console.log(classes)
            elem.students.forEach((student) => __awaiter(void 0, void 0, void 0, function* () {
                let studentForm = yield student_1.default.fetchStudenAllotementDetails(student.email);
                let newStudnet = studentForm;
                newStudnet = newStudnet;
                newStudnet.isBlocked = false;
                newStudnet.classId = elem.classId;
                newStudnet.course = elem.course;
                newStudnet.attendence = [];
                yield student_1.default.createStudent(newStudnet);
            }));
        }));
        yield (0, allotment_1.createAllotmentDoc)(selectedStudents);
        console.log(selectedStudents);
        console.log("allotment success ");
    }
    catch (err) {
        console.log("err in allotment : ", err);
    }
});
const newChat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { message, subject } = req.body;
        console.log(req.user);
        let chat = {
            name: req.user.name,
            userId: req.user.id,
            date: new Date,
            subject: subject,
            message: message
        };
        yield class_1.default.newChat(req.user.classId, chat);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const getAllChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject } = req.params;
        let chats = yield class_1.default.allChats(req.user.classId, subject);
        res.status(200).json(chats);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const allPeople = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { classId, course } = req.user;
        const { subject } = req.params;
        console.log("subject : ", subject);
        let students = yield class_1.default.findAllStudentsByClassId(classId);
        //@ts-ignore
        let teachers = yield college_1.default.findTeacherInClass(students.collegeId, course, students.sem, subject);
        console.log(teachers);
        res.status(200).json({ students: students.students, teachers: (_a = teachers[0]) === null || _a === void 0 ? void 0 : _a.teacher });
    }
    catch (err) {
        console.log(err);
        res.status(err.status || 500).json(err.message || "Internal server error");
    }
});
const getAllEvents = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subject } = req.params;
        let events = yield class_1.default.allEvents(req.user.classId, subject);
        res.status(200).json(events);
    }
    catch (err) {
        let error = err;
        res.status(error.status || 500).json(error.message || "Internal server error");
    }
});
const getAllAllotmentThisYear = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allotment = yield student_1.default.allStudentAllotmentThisYear();
        // console.log(allotment)
        res.status(200).json(allotment);
    }
    catch (err) {
        let error = err;
        res.status(error.status || 500).json(error.message || "Internal server error");
    }
});
const blockStudentApplicants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("block students")
        let user = yield student_1.default.fetchAStudentApplicant(req.body._id);
        console.log(req.body._id, user);
        let isBlocked = user.isBlocked;
        yield student_1.default.invertBlockStudentApplication(req.body._id, isBlocked);
        // console.log(allotment)
        res.sendStatus(204);
    }
    catch (err) {
        let error = err;
        console.log(error);
        res.status(error.status || 500).json(error.message || "Internal server error");
    }
});
exports.default = { createStudentAllotment, createStudent, allStudents, blockStudent, getAStudent, admissionPayment, allSubjects, allotment, newChat, getAllChats, allPeople, getAllEvents, getAllAllotmentThisYear, blockStudentApplicants };
// function assignToCollege(students: studentApplicationFormType[], colleges: College[]) {
//   const selectedStudents = []
//   const rejectedStudents = []
//   // Sort the students array in descending order by their marks
//   students.sort((a, b) => b.totalMark - a.totalMark);
//   for (let student of students) {
//     // Iterate over the student's admission preferences
//     for (let preference of student.admissionPreference) {
//       // Find the corresponding college object
//       let college = colleges.find(c => c.collegeId === preference.collegeId);
//       // Find the corresponding department object
//       let department = college!.department.find(d => d.name === preference.course);
//       // Check if there are any available seats in the department
//       let yearIndex = department?.seats.findIndex(x => {
//         console.log(x.year, moment(new Date).year() -1)
//         return x.year === moment(new Date).year() -1
//       })
//       console.log(department!.seats[yearIndex!], yearIndex)
//       if (department!.seats[yearIndex!].seats < department?.maxCandidate!) {
//         // Accept the student to the department and decrease the number of available seats
//         department!.seats[yearIndex!].seats++;
//         selectedStudents.push({ collegeId: college?.collegeId, course: department?.name, name: student.name, email: student.email })
//         break;
//       } else {
//         if (preference.preference === 3) {
//           rejectedStudents.push({ name: student.name, email: student.email })
//         }
//       }
//     }
//   }
//   return { selectedStudents, rejectedStudents };
// }
function assignToCollege(students, colleges) {
    const selectedStudents = [];
    const rejectedStudents = [];
    // Create a hash map to store the college and department objects
    const collegeMap = new Map();
    for (const college of colleges) {
        for (const department of college.department) {
            //Initiallizing the bookes seats as 0 it can go upto department.maxCandidate
            department.seats = 0;
            const key = `${college.collegeId}-${department.name}`;
            collegeMap.set(key, { college, department });
        }
    }
    // Sort the students array in descending order by their marks
    students.sort((a, b) => b.totalMark - a.totalMark);
    for (let student of students) {
        // Iterate over the student's admission preferences
        for (let preference of student.admissionPreference) {
            // Find the corresponding college and department objects using the hash map
            const key = `${preference.collegeId}-${preference.course}`;
            const { college, department } = collegeMap.get(key) || {};
            if (!department)
                continue;
            // Check if there are any available seats in the department
            if (department.seats < department.maxCandidate) {
                // Accept the student to the department and decrease the number of available seats
                department.seats++;
                selectedStudents.push({ collegeId: college.collegeId, course: department.name, name: student.name, email: student.email });
                break;
            }
            else {
                if (preference.preference === 3) {
                    rejectedStudents.push({ name: student.name, email: student.email });
                }
            }
        }
    }
    return { selectedStudents, rejectedStudents };
}
function assignToClass(students) {
    // Create an object to store the classes
    const classes = {};
    // Iterate over the students
    for (const student of students) {
        // Create a key for the class using the collegeId and course
        const key = `${student.collegeId}-${student.course}`;
        // If the class doesn't exist yet, create it
        if (!classes[key]) {
            classes[key] = {
                collegeId: student.collegeId,
                course: student.course,
                classId: `${student.collegeId + student.course + (0, moment_1.default)(new Date).year()}`,
                year: (0, moment_1.default)(new Date).year(),
                sem: 1,
                students: [],
            };
        }
        // Push the student's name to the class's students array
        classes[key].students.push({ name: student.name, email: student.email });
    }
    // Convert the object of classes into an array
    const classArray = Object.values(classes);
    // Return the array of class objects
    return classArray;
}
