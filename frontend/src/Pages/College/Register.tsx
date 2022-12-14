import { SelectChangeEvent } from '@mui/material';
import { stringify } from 'querystring';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import RegisterForm, { Select } from '../../Components/RegisterForm'
import axios from './axios';

interface course {
  id: number,
  ref: string,
  maxCandidate: Number,
}

export interface College {
  name: string,
  email: string,
  password: string,
  contact: string,
  address: string,
  course: course[],
  collegeId: string,
  place: string
}

let fieldCount = 0;

function Register() {
  const navigate = useNavigate()
  const [department, setDepartment] = useState([])



  const defaultFormValues: College = {
    name: "",
    address: "",
    email: "",
    contact: "",
    password: "",
    collegeId: "",
    place: "",
    course: [],
  }


  const [values, setValues] = useState<College>(defaultFormValues);

  const handleClear = (): void => {
    console.log("handleclear")
    setValues(defaultFormValues);
  }

  const [error, setError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(values)
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent): void => {
    console.log(e.target.name, e.target.value)
    const preference = parseInt(e.target.name.slice(0, 1))
    if (e.target.name.substring(1) === "collegeId") {
      let courseObj = { id: preference, ref: e.target.value, maxCandidate: 0 }
      let temp = values;
      //@ts-ignore
      temp.course.push(courseObj)
      setValues({ ...temp })
    } else if (e.target.name.substring(1) === "maxCandidate") {
      let temp = values;
      console.log(preference)
      //@ts-ignore
      temp.course[preference].maxCandidate = e.target.value
      setValues({ ...temp })
    }
    else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    console.log(values)
    //@ts-ignore
  };

  const handleSubmit = (): void => {
    console.log(values)
    axios
      .post("/college/apply ", values)
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
      name: "place",
      label: "Place",
    },
    {
      id: 7,
      name: "collegeId",
      label: "College Id",
    },
  ]

  const maxCandidateOption = [{
    label: 10,
    value: 10
  },
  {
    label: 50,
    value: 50
  },
  {
    label: 100,
    value: 100
  },
  {
    label: 200,
    value: 200
  }
  ]

  useEffect(() => {
    axios.get("/college/department/all").then((res) => {
      console.log(res)
      //@ts-ignore
      const data = [...res.data.map(elem => {
        return { value: elem.name, label: elem.name };
      })]
      //@ts-ignore
      setDepartment(data)
    })
  }, [])

  let [selectFields, setSelectFields] = useState<Select[]>([
    {
      id: 0,
      width: 0,
      name: "",
      label: "",
      options: []
    }
  ])

  const departmentModelObj = {
    id: 0,
    width: 8,
    name: "0collegeId",
    label: "Department",
    options: department.filter(department => {
      //@ts-ignore
      return !values.course.some(course => course.ref === department.value);
    })
  }

  const maxCandidateModelObj = {
    id: 0,
    width: 4,
    name: "0maxCandidate",
    label: "Max Students",
    options: maxCandidateOption
  }

  useEffect(() => {
    setSelectFields([
      departmentModelObj,
      maxCandidateModelObj
    ])
  }, [department])


  const handleAddDepartment = (e: React.MouseEvent<HTMLElement>): void => {
    ++fieldCount;
    console.log(fieldCount)
    let lastElem = selectFields.length - 1;
    const departmentField = departmentModelObj
    const maxCandidate = maxCandidateModelObj
    departmentField.id = ++lastElem;
    departmentField.name = fieldCount.toString().concat(departmentField.name.substring(1))
    maxCandidate.id = ++lastElem;
    maxCandidate.name = fieldCount.toString().concat(maxCandidate.name.substring(1))
    setSelectFields([...selectFields, departmentField, maxCandidate])
  }

  const handleRemove = (e: React.MouseEvent<HTMLElement>): void => {
    const temp = selectFields
    console.log(temp)
    temp.pop();
    temp.pop();
    console.log(temp)
    console.log(values)
    const prevValues = values;
    console.log(fieldCount, prevValues.course.length - 1)
    if (fieldCount === prevValues.course.length - 1) {
      console.log("deleting the values")
      prevValues.course.pop()
    }
    setValues({ ...prevValues })
    setSelectFields([...temp])
    --fieldCount;
  }



  // useEffect(() => {
  //   setSelectFields(prevSelectedFields => {
  //     return prevSelectedFields.map(field => {
  //       if (field.name.substring(1) === "collegeId") {
  //         const index = parseInt(field.name.slice(0, 1))
  //         console.log(index)
  //         console.log(values)
  //         return {
  //           ...field,
  //           value: values.course[index].ref,
  //           options: department.filter(department => {
  //             return !values.course.some(course => course.ref === department.value);
  //           })
  //         }
  //       } else {
  //         return field;
  //       }
  //     })
  //   })
  // }, [values])

  return <Fragment>
    <RegisterForm handleAddDepartment={handleAddDepartment} handleRemove={handleRemove} handleChange={handleChange} handleClear={handleClear} values={values} handleSelectChange={handleSelectChange} handleSubmit={handleSubmit} error={error} fields={fields} selectFields={selectFields} />
  </Fragment>
}

export default Register