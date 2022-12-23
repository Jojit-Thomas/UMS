import React, { useState } from 'react'
import LoginComponent from '../../Components/LoginComponent';
import { useNavigate } from 'react-router-dom';
import axios from './axios';

const Login = () => {

  
  const navigate = useNavigate()
  interface Values {
    email: String,
    password: String
  }
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //keyof GlobalEventHandlersEventMap
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (): void => {
    console.log(values);
    axios
      .post("/auth/college/login", values)
      .then((result) => {
        console.log("success : ", result);
        localStorage.setItem("collegeAccessToken", result.data.accessToken);
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        console.error("error : ", error.response.data);
        setError(error.response.data)
      });
  };

  const fields = [
    {
      id: 1,
      name: "collegeId",
      label: "College Id",
    },
    {
      id: 2,
      name: "password",
      label: "Password",
    }
  ]

  return (
    <LoginComponent handleChange={handleChange} handleSubmit={handleSubmit} error={error} fields={fields} />
  )
}

export default Login