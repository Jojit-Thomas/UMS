import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Home from './Pages/Home';
import Index from './Pages/Index';
import NotFound from './Pages/NotFound';
//Teacher
import TeacherRegister from './Pages/Teacher/Register';
import TeacherLogin from './Pages/Teacher/Login';
import TeacherIndex from './Pages/Teacher/Index';
import TeacherHome from './Pages/Teacher/Home';
import TeacherClassRoom from './Pages/Teacher/ClassRoom';
//University
import UniversityLogin from './Pages/University/Login';
import UniversityIndex from './Pages/University/Index';
import UniversityHome from './Pages/University/Home';
import UniversityCourse from './Pages/University/Course';
import UniversityCourseDetails from './Pages/University/CourseDetails';
import UniversityCollege from './Pages/University/College';
import UniversityNewCourse from './Pages/University/NewCourse';
import UniversityAllotment from './Pages/University/Allotment';
// Student
import StudentIndex from './Pages/Student/Index';
import StudentHome from './Pages/Student/Home';
import StudentLogin from './Pages/Student/Login';
import StudentRegister from './Pages/Student/Register';
import StudentClassRoom from './Pages/Student/ClassRoom';
//College
import CollegeHome from './Pages/College/Home';
import CollegeIndex from './Pages/College/Index';
import CollegeLogin from './Pages/College/Login';
import CollegeApplication from './Pages/College/Applications';
import CollegeRegister from './Pages/College/Register';
import CollegeDepartment from './Pages/College/Department';
import CollegeNewDepartment from './Pages/College/NewDepartment';
import CollegeDepartmentDetails from './Pages/College/DepartmentDetails';
import CollegeTeacher from './Pages/College/Teacher';
import CollegeStudent from './Pages/College/Student';
// import { userContext } from './utils/store';
import { useDispatch } from 'react-redux';
import { setDetails } from './Pages/Student/studentSlice';

function App() {

  // const { setUser } = useContext(userContext)

  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/links' element={<Home />} />
        <Route path='/university' element={<UniversityIndex />}>
          <Route index element={<UniversityHome />} />
          <Route path='course' element={<UniversityCourse />} />
          <Route path='course/:name' element={<UniversityCourseDetails />} />
          <Route path='course/add' element={<UniversityNewCourse />} />
          <Route path='college' element={<UniversityCollege />} />
          <Route path='login' element={<UniversityLogin />} />
          <Route path='allotment' element={<UniversityAllotment />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        <Route path='/student' element={<StudentIndex/>}>
          <Route index element={<StudentHome />} />
          <Route path='login' element={<StudentLogin />} />
          <Route path='register' element={<StudentRegister />} />
          <Route path=':classId/:subject' element={<StudentClassRoom />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/teacher' element={<TeacherIndex/>}>
          <Route index element={<TeacherHome/>} />
          <Route path='application' element={<TeacherRegister />} />
          <Route path='login' element={<TeacherLogin />} />
          <Route path='register' element={<TeacherRegister />} />
          <Route path=':department/:subject/:semester' element={<TeacherClassRoom />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/college' element={<CollegeIndex/>}>
          <Route index  element={<CollegeHome/>}/>
          <Route path='login' element={<CollegeLogin />} />
          <Route path='register' element={<CollegeRegister />} />
          <Route path='application' element={<CollegeApplication />} />
          <Route path='department' element={<CollegeDepartment />} />
          <Route path='department/add' element={<CollegeNewDepartment />} />
          <Route path='department/:departmentName' element={<CollegeDepartmentDetails />} />
          <Route path='teacher' element={<CollegeTeacher />} />
          <Route path='student' element={<CollegeStudent />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
}

export default App;
