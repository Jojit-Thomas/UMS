import React, { useContext } from 'react';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Bus from './Pages/Bus/Bus';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import {UserContext} from './store'

function App() {
  const ctx = useContext(UserContext);
  if(ctx) {
    let user = localStorage.getItem("user");
    ctx.setUser(user)
  }
  return <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/bus/:busid' element={<Bus/>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
