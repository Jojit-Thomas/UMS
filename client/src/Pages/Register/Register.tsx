import { Button, Grid, Paper, TextField } from "@mui/material/";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "../../axios";
import { isRegisterFormValid } from "../../config/validation";

function Register() {
  const navigate = useNavigate();
  interface FieldType {
    value: String;
    error: boolean;
    error_msg: String;
  }
  interface Values {
    name : FieldType,
    email : FieldType,
    password : FieldType
  }
  const [values, setValues] = useState<Values>({
    name: {
      value: "",
      error: true,
      error_msg: "",
    },
    email: {
      value: "",
      error: true,
      error_msg: "",
    },
    password: {
      value: "",
      error: true,
      error_msg: "",
    },
  });
  const [error, setError] = useState<String>("");
  const handleChange = (e: any): void => {
    //keyof GlobalEventHandlersEventMap
    console.log(values);
    e.target.value = e.target.value;
    
    let validateObj = {
      name: (e.target.name === "name") ? e.target.value : values.name.value,
      email: (e.target.name === "email") ? e.target.value : values.email.value,
      password: (e.target.name === "password") ? e.target.value : values.password.value,
    };
    isRegisterFormValid(validateObj)
      .then(() => {
        setValues({
          ...values,
          [e.target.name]: { value: e.target.value, error: false },
        });
      })
      .catch((err) => {
        err = err.filter((er: any) => {
          if (er.path[0] === e.target.name) {
            return er;
          }
        });
        if (err.length > 0) {
          console.log("`````", err);
          setValues({
            ...values,
            [e.target.name]: {
              value: e.target.value,
              error: true,
              error_msg: err[0].message,
            },
          });
        } else {
          setValues({
            ...values,
            [e.target.name]: { value: e.target.value, error: false },
          });
        }
      });
  };
  const handleSubmit = (): void => {
    let data = {
      name: values.name.value,
      email: values.email.value,
      password: values.password.value,
    };
    // if(values.name.error || values.email.error || values.password.error) return;
    axios
      .post("/auth/register", data)
      .then((result) => {
        // console.log("success : ", result);
        navigate("/login");
      })
      .catch((error) => {
        console.error("error : ", error.response.data);
        setError(error.response.data[0] ? "Please fill out this fields" : error.response.data)
      });
  };
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        className="register-page"
      >
        <Paper elevation={10} className="form_container">
          <TextField
            name="name"
            id="outlined-error-helper-text"
            label="Name"
            placeholder="Jojit"
            fullWidth
            sx={{"margin" : "10px 0px"}}
            onChange={handleChange}
            error={values.name.error_msg ? true : false}
            helperText={values.name.error ? values.name.error_msg : null}
          />
          <TextField
            name="email"
            id="outlined-error-helper-text"
            label="Email"
            placeholder="jojit@gmail.com"
            fullWidth
            sx={{"margin" : "10px 0px"}}
            onChange={handleChange}
            error={values.email.error_msg ? true : false}
            helperText={values.email.error ? values.email.error_msg : null}
          />
          <TextField
            name="password"
            id="outlined-error-helper-text"
            label="Password"
            placeholder="asdfasdf"
            fullWidth
            sx={{"margin" : "10px 0px"}}
            onChange={handleChange}
            error={values.password.error_msg ? true : false}
            helperText={values.password.error ? values.password.error_msg : null}
          />
          <span className="error-txt">{error ? error : null}</span>
          <Grid container direction="row-reverse">
            <Button onClick={handleSubmit} variant="contained">
              Register
            </Button>
          </Grid>
          <Grid container justifyContent="center" className="hyperlink">
            Already Registered? <Link to="/login">Login</Link>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default Register;
