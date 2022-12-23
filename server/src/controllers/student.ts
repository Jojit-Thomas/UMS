import moment from "moment";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Razorpay from "razorpay";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import studentDB from "../services/student";
import validation from "../services/validation";
import { studentApplicationFormType } from "../models/student_application_model";
import { College } from "../models/college_model";
import collegeDB from "../services/college";
import classDB from "../services/class";
import { Student } from "../models/student_model";
import { Chats } from "../models/class_model";
dotenv.config();

var instance = new Razorpay({
  key_id: 'rzp_test_8JLZOZRODQ9Mpc',
  key_secret: process.env.RAZOR_PAY_SECRET,
});


const createStudentAllotment: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    await validation.isStudentApllicationFormValid(req.body)
    req.body.DOB = moment(req.body.DOB)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await studentDB.createStudentAllotment(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    console.log(err)
    res.status(err.status || 500).json(err)
  }
}

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    await validation.isCreateStudentValid(req.body)
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await studentDB.createStudent(req.body)
    res.sendStatus(204)
  } catch (err: any) {
    console.log(err);
    res.status(err.status || 500).json(err)
  }
}

const allStudents: RequestHandler = async (req, res, next) => {
  try {
    let students = await studentDB.fetchStudents()
    res.status(200).json(students)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const blockStudent: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params
    if (!email) throw createHttpError.BadRequest("Email is required")
    const { isBlocked } = await studentDB.getStudentBlockStatus(email)
    await studentDB.blockStudents(email, isBlocked)
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const getAStudent: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.params
    if (!email) throw createHttpError.BadRequest("Email is required")
    let studentDetails = await studentDB.fetchAStudentDetails(email)
    res.status(200).json(studentDetails)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message)
  }
}

const admissionPayment: RequestHandler = async (req, res, next) => {
  try {
    var options = {
      amount: 5000,  // amount in the smallest currency unit
      currency: "INR",
      receipt: `order_${Date.now()}_${Math.random()}`
    };
    instance.orders.create(options, function (err: any, order: any) {
      console.log(err)
      if (err) throw createHttpError.InternalServerError()
      res.status(200).json(order)
    });
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

const allSubjects: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.user)
    //@ts-ignore
    let {sem} = await classDB.fetchClassDetails(req.user.class)
    //@ts-ignore
    let subjects = await collegeDB.getStudentSubjects(req.user.course, sem )
    res.status(200).json(subjects)
    // res.send("All subjects will be provided")
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}


const allotment: RequestHandler = async (req, res, next) => {
  try {
    let date = moment(new Date).subtract(1, "year").toDate()
    console.log(date)
    let studentApplication = await studentDB.getStudentApplicationAfterDate(date)
    let colleges = await collegeDB.fetchAllCollege();
    let {selectedStudents, rejectedStudents} = assignToCollege(studentApplication, colleges)
    let classes = assignToClass(selectedStudents);
    classes.forEach(async (elem: any) => {
      await classDB.createClass(elem)
      // console.log(classes)
      elem.students.forEach(async (student : any) => {
        let studentForm = await studentDB.fetchStudenAllotementDetails(student.email)
        let newStudnet : Student = studentForm as never
        newStudnet = newStudnet as Student
        newStudnet.isBlocked = false;
        newStudnet.classId = elem.classId;
        newStudnet.course = elem.course;
        newStudnet.attendence = [];
        await studentDB.createStudent(newStudnet)
      })
    })
    res.sendStatus(204)
  } catch (err: any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

const newChat:RequestHandler = async (req, res, next) => {
  try {
    console.log(req.user)
    const {message} = req.body;
    let chat : Chats = {
      name : req.user.name,
      email : req.user.aud,
      date : new Date,
      message : message
    }
    await classDB.newChat(req.user.class, chat)
    res.sendStatus(204)
  } catch(err : any) {
    res.status(err.status || 500).json(err.message || "Internal server error")
  }
}

export default { createStudentAllotment, createStudent, allStudents, blockStudent, getAStudent, admissionPayment, allSubjects, allotment, newChat }

function assignToCollege(students: studentApplicationFormType[], colleges: College[]) {
  const selectedStudents = []
  const rejectedStudents = []
  // Sort the students array in descending order by their marks
  students.sort((a, b) => b.totalMark - a.totalMark);
  for (let student of students) {
    // Iterate over the student's admission preferences
    for (let preference of student.admissionPreference) {
      // Find the corresponding college object
      let college = colleges.find(c => c.collegeId === preference.collegeId);

      // Find the corresponding department object
      let department = college!.department.find(d => d.name === preference.course);

      // Check if there are any available seats in the department
      let yearIndex = department?.seats.findIndex(x => x.year === moment(new Date).year())
      console.log(department!.seats[yearIndex!].seats)
      if (department!.seats[yearIndex!].seats < department?.maxCandidate!) {
        // Accept the student to the department and decrease the number of available seats
        department!.seats[yearIndex!].seats++;
        selectedStudents.push({collegeId : college?.collegeId, course : department?.name, name : student.name, email : student.email})
        break;
      } else {
        if(preference.preference === 3) {
          rejectedStudents.push({name : student.name, email : student.email})
        }
      }
    }
  }
  return {selectedStudents, rejectedStudents};
}


function assignToClass(students : any) {
  // Create an object to store the classes
  const classes: any = {};

  // Iterate over the students
  for (const student of students) {
    // Create a key for the class using the collegeId and course
    const key = `${student.collegeId}-${student.course}`;

    // If the class doesn't exist yet, create it
    if (!classes[key]) {
      classes[key] = {
        collegeId: student.collegeId,
        course: student.course,
        classId : `${student.collegeId + student.course + moment(new Date).year()}`,
        year : moment(new Date).year(),
        sem : 1,
        students: [],
      };
    }

    // Push the student's name to the class's students array
    classes[key].students.push({name : student.name, email : student.email});
  }

  // Convert the object of classes into an array
  const classArray: any = Object.values(classes);

  // Return the array of class objects
  return classArray;
}
