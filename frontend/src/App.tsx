import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import Home from './Pages/Home';
import Index from './Pages/University/Index';
import StudentIndex from './Pages/Student/Index';
import Login from './Pages/University/Login';
import StudentLogin from './Pages/Student/Login';
import Register from './Pages/Student/Register';
import TeacherRegister from './Pages/Teacher/Register';
import CollegeRegister from './Pages/College/Register';
import NotFound from './Pages/NotFound';

function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/university/*'>
          <Route index element={<Index title="University" />} />
          <Route path='login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/student'>
          <Route index element={<StudentIndex />} />
          <Route path='login' element={<StudentLogin />} />
          <Route path='register' element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/teacher'>
          <Route index element={<Index title="Teacher Home Page" />} />
          <Route path='register' element={<TeacherRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/college'>
          <Route index element={<Index title="Teacher Home Page" />} />
          <Route path='register' element={<CollegeRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
}

export default App;
