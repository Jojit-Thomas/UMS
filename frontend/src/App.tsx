import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import NotFound from './Pages/NotFound';
import Index from './Pages/University/Index';
import Login from './Pages/University/Login';

function App() {
  return <Fragment>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/university/*'>
          <Route index element={<Index/>}/>
          <Route path='login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Fragment>
}

export default App;
