import axios from './axios';
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginComponent from "../../Components/LoginComponent"
import { useDispatch } from 'react-redux';
import { setDetails } from './teacherSlice';

function Login() {

  const dispatch = useDispatch();

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
      .post("/auth/teacher/login", values)
      .then((result) => {
        console.log("success : ", result);
        localStorage.setItem("teacher", JSON.stringify(result.data));
        dispatch(setDetails(result.data.user))
        navigate('/teacher')
      })
      .catch((error) => {
        console.log(error)
        console.error("error : ", error.response);
        setError(error.response.data)
      });
  };

  const fields = [
    {
      id: 1,
      name: "email",
      label: "Email",
    },
    {
      id: 2,
      name: "password",
      label: "Password",
    }
  ]

  return <Fragment>
    <LoginComponent handleChange={handleChange} handleSubmit={handleSubmit} error={error} fields={fields}></LoginComponent>
  </Fragment>
}

export default Login