import { Button, Grid, Paper, TextField } from "@mui/material/";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "../../axios";
import './Login.css'

function Login() {
  const navigate = useNavigate()
  interface Values {
    email : String,
    password : String
  }
  const [values, setValues] = useState<Values>({
    email : "",
    password : "",
  });
  const [error, setError] = useState();
  const handleChange = (e: any): void => {
    //keyof GlobalEventHandlersEventMap
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (): void => {
    console.log(values);
    axios
      .post("/auth/login", values)
      .then((result) => {
        console.log("success : ", result);
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("user", result.data.user);
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        console.error("error : ", error.response.data);
        setError(error.response.data)
      });
  };

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        className="login-page"
      >
        <Paper elevation={10} className="form_container">
          <TextField
            name="email"
            id="outlined-error-helper-text"
            label="Email"
            placeholder="jojit@gmail.com"
            fullWidth
            onChange={handleChange}
            sx={{"margin" : "10px 0px"}}
          />
          <TextField
            name="password"
            id="outlined-error-helper-text"
            label="Password"
            placeholder="asdfasdf"
            fullWidth
            onChange={handleChange}
            sx={{"margin" : "10px 0px"}}
          />
                    <span className="error-txt">{error ? error : null}</span>

          <Grid container direction="row-reverse">
            <Button onClick={handleSubmit} variant="contained">
              Login
            </Button>
          </Grid>
          <Grid container justifyContent="center" className="hyperlink">Don't have an account? <Link to="/register">Register</Link></Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Login