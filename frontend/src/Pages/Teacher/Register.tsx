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

interface admissionPreference {
  preference: number,
  collegeId: string,
  course: string
}

export interface Values {
  name: string,
  address: string,
  email: string,
  totalMark: Number,
  contact: string,
  admissionPreference: admissionPreference[],
  gender: Gender,
  markListLink: string,
  educationalQualification: string,
  DOB: Date,
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


  const defaultFormValues = {
    name: "",
    address: "",
    email: "",
    contact: "",
    totalMark: 0,
    admissionPreference: [{
      preference: 1,
      collegeId: "",
      course: ""
    },
    {
      preference: 2,
      collegeId: "",
      course: ""
    },
    {
      preference: 3,
      collegeId: "",
      course: ""
    }
    ],
    gender: Gender.NOT_SELECTED,
    markListLink: "http://s3bucket.com/tempeuniversity  ",
    educationalQualification: "",
    DOB: new Date(),
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
    const preference = parseInt(e.target.name.slice(0, 1))
    if (e.target.name.substring(1) === "preferredCollege") {
      values.admissionPreference[preference - 1].collegeId = e.target.value;
      const { admissionPreference } = values;
      const updatedAdmissionPreference = admissionPreference
      setValues({ ...values, ['admissionPreference']: updatedAdmissionPreference })
    } else if (e.target.name.substring(1) === "preferredSubject") {
      values.admissionPreference[preference - 1].course = e.target.value;
      const { admissionPreference } = values;
      const updatedAdmissionPreference = admissionPreference
      setValues({ ...values, ['admissionPreference']: updatedAdmissionPreference })
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    console.log(values)
    //@ts-ignore
    console.log(college[0].course.map(course => {
      return { value: course.ref, label: course.ref };
    }))
    //@ts-ignore
    console.log(college[0].course)
  };

  const handleSubmit = (): void => {
    axios
      .post("/student/admission/apply ", values)
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
      id: 5,
      name: "totalMark",
      label: "Total Marks",
    },
    {
      id: 7,
      name: "password",
      label: "Password",
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
      name: "educationalQualification",
      label: "Education Qualification",
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
      id: 7,
      name: "1preferredCollege",
      label: "1st Preffered College",
      options: [...college]
    },
    {
      id: 8,
      name: "1preferredSubject",
      label: "1st Preffered Subject",
      options: college ? (values.admissionPreference[0].collegeId !== "") ? // If college is recieved and the college is selected
        //@ts-ignore
        college.find(x => x.value === values.admissionPreference[0].collegeId).course.map(course => {
          return { value: course.ref, label: course.ref };
        }) : [] : []
    },
    {
      id: 9,
      name: "2preferredCollege",
      label: "2nd Preffered College",
      options: [...college]
    },
    {
      id: 10,
      name: "2preferredSubject",
      label: "2nd Preffered Subject",
      options: college ? (values.admissionPreference[1].collegeId !== "") ?
        //@ts-ignore
        college.find(x => x.value === values.admissionPreference[1].collegeId).course.map(course => {
          return { value: course.ref, label: course.ref };
        }) : [] : []
    },
    {
      id: 11,
      name: "3preferredCollege",
      label: "3rd Preffered College",
      options: [...college]
    },
    {
      id: 12,
      name: "3preferredSubject",
      label: "3rd Preffered Subject",
      options: college ? (values.admissionPreference[2].collegeId !== "") ?
        //@ts-ignore
        college.find(x => x.value === values.admissionPreference[2].collegeId).course.map(course => {
          return { value: course.ref, label: course.ref };
        }) : [] : []
    },
  ]

  return <Fragment>
    <RegisterForm handleChange={handleChange} handleClear={handleClear} handleDateChange={handleDateChange} values={values} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} error={error} fields={fields} selectFields={selectFields} />
  </Fragment>
}

export default Register