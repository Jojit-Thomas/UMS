import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import NotFound from './Pages/NotFound';
import TeacherRegister from './Pages/Teacher/Register';
import Register from './Pages/Student/Register';
import Index from './Pages/University/Index';
import Login from './Pages/University/Login';

function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index title="Home Page" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/university/*'>
          <Route index element={<Index title="University" />} />
          <Route path='login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/student'>
          <Route index element={<Index title="Student" />} />
          <Route path='register' element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/teacher'>
          <Route index element={<Index title="Teacher Home Page" />} />
          <Route path='register' element={<TeacherRegister />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
}

export default App;
