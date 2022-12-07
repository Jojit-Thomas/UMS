import React, { useContext } from 'react'
import axios from '../../axios';
import { useNavigate } from 'react-router-dom'

import "./Header.css"
import { UserContext } from '../../store';

function Header() {

  const navigate = useNavigate();
  const ctx = useContext(UserContext)

  let logout = () => {
    let refreshToken = localStorage.getItem("refreshToken")
    axios.delete("/auth/logout", {
      data: {
        refreshToken
      }
    }).then(() => {
      localStorage.removeItem("users");
      localStorage.removeItem("accessToken");
      navigate("/login")
    })

  }

  return (
    <div><nav className="navbar">
    <div className="container">
  
      <div className="navbar-header">
        <button className="navbar-toggler" data-toggle="open-navbar1">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a href="#">
          <h4><span>Bookit</span></h4>
        </a>
      </div>
  
      <div className="navbar-menu" id="open-navbar1">
        <ul className="navbar-nav">
          <li className="active"><a onClick={() => navigate('/')} >Home</a></li>
          {/* <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li> */}
          {
            ctx?.user ? 
            <li><a onClick={logout}>Logout</a></li>:
            <li><a onClick={() => navigate('/login')}>Signin</a></li>
          }
          <li><a >{ctx?.user}</a></li>
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Header