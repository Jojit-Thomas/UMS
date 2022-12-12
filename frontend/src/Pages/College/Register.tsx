import { SelectChangeEvent } from '@mui/material';
import { stringify } from 'querystring';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterForm, { Select } from '../../Components/RegisterForm'
import axios from './axios';

enum Gender {
  NOT_SELECTED,
  MALE,
  FEMALE
}


export interface Values {
  name: string,
  address: string,
  email: string,
  totalMark: Number,
  contact: string,
  collegeId : string,
  subject: string,
  gender: Gender,
  markListLink: string,
  DOB: Date,
  password: string,
  skills: string,
  experience: string,
  qualification : string,
}

function Register() {
  const navigate = useNavigate()
  const [college, setCollege] = useState([])
  useEffect(() => {
    axios.get("/college/list").then((res) => {
      //@ts-ignore
      const data = [...res.data.map(elem => {
        return { value: elem.collegeId, label: elem.name, course: elem.course };
      })]
      //@ts-ignore
      setCollege(data)
    })
  }, [])


  const defaultFormValues : Values = {
    name: "",
    address: "",
    email: "",
    contact: "",
    totalMark: 0,
    collegeId : "",
    subject: "",
    gender: Gender.NOT_SELECTED,
    markListLink: "http://s3bucket.com/tempeuniversity  ",
    qualification: "",
    DOB: new Date(),
    password: "",
    skills: "",
    experience: ""
  }


  const [values, setValues] = useState<Values>(defaultFormValues);

  const handleClear = (): void => {
    console.log("handleclear")
    setValues(defaultFormValues);
  }

  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(values)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: any): void => {
    console.log(date)
    setValues({ ...values, ["DOB"]: date });
  }

  const handleSelectChange = (e: SelectChangeEvent): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values)
    //@ts-ignore
  };

  const handleSubmit = (): void => {
    axios
      .post("/teacher/apply ", values)
      .then((result) => {
        console.log("success : ", result);
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
      name: "name",
      label: "Full Name",
    },
    {
      id: 2,
      name: "email",
      label: "Email Address",
    },
    {
      id: 3,
      name: "contact",
      label: "Contact No",
    },
    {
      id: 7,
      name: "password",
      label: "Password",
    },
    {
      id: 7,
      name: "skills",
      label: "Skills",
    },
    {
      id: 5,
      name: "totalMark",
      label: "Total Marks",
    },

  ]

  const selectFields: Array<Select> = [
    {
      id: 4,
      name: "gender",
      label: "Gender",
      options: [
        { value: "MALE", label: "Male" },
        { value: "FEMALE", label: "Female" }
      ]
    },
    {
      id: 7,
      name: "qualification",
      label: "Educational Qualification",
      options: [
        {
          value: "HighSchool",
          label: "High School"
        },
        {
          value: "BachelorDegree",
          label: "Bachelor Degree"
        }
      ]
    },
    {
      id: 8,
      name: "experience",
      label: "Experience",
      options: [
        {
          value: '0-6 Months',
          label: '0-6 Months'
        },
        {
          value: '1 Year',
          label: '1 Year'
        },
        {
          value: '3 Year',
          label: '3 Year'
        },
        {
          value: '5 Year',
          label: '5 Year'
        },
        {
          value: 'More than 5 year',
          label: 'More than 5 Year'
        },
      ]
    },
    {
      id: 7,
      name: "collegeId",
      label: "College",
      options: [...college]
    },
    {
      id: 8,
      name: "subject",
      label: "Subjects",
      options: college ? (values.collegeId !== "") ? // If college is recieved and the college is selected
        //@ts-ignore
        college.find(x => x.value === values.college).course.map(course => {
          return { value: course.ref, label: course.ref };
        }) : [] : []
    }
  ]

  return <Fragment>
    <RegisterForm handleChange={handleChange} handleClear={handleClear} handleDateChange={handleDateChange} values={values} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} error={error} fields={fields} selectFields={selectFields} />
  </Fragment>
}

export default Register