


import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from './axios'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { Cancel, Edit } from '@mui/icons-material';

const DepartmentDetails = () => {

  interface Subjects {
    name: string,
    teacher: string
  }

  interface Department {
    name: string,
    qualification: string,
    maxCandidate: number,
    semesters: [{
      sem: number,
      subjects: Subjects[]
    }]
  }

  const [department, setDepartment] = useState<Department>();

  const [teachers, setTeachers] = useState([]);

  const [isEditable, setIsEditable] = useState(false);

  const { departmentName } = useParams();

  useEffect(() => {
    axios.get(`/college/department/${departmentName}`).then((res) => {
      console.log("version", res.data.department[0])
      setDepartment(res.data.department[0])
    })
    axios.get('/college/teacher/all').then((res) => {
      console.log(res.data)
      setTeachers(res.data)
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxCandiate = parseInt(e.target.value)
    setDepartment({ ...department!, maxCandidate: maxCandiate })
  }


  const handleTeacherChange = (e: SelectChangeEvent) => {
    console.log(e.target.name, e.target.value)
    const [input, teacher] = [e.target.name, e.target.value]
    const [sem, subject] = input.split('-');
    const semIndex = parseInt(sem) - 1;
    const subIndex = department!.semesters[semIndex].subjects.findIndex(s => s.name === subject);
    department!.semesters[semIndex].subjects[subIndex].teacher = teacher;
    setDepartment({ ...department! })
  }

  const navigate = useNavigate()

  const handleSubmit = () => {
    console.log(department)
    axios.put("/college/department/edit", department).then(() => navigate('/college/department')).catch(err => console.log(err))
  }

  useEffect(() => console.log(department), [department])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ "minHeight": "100vh" }}
      className="login-page"
    >

      {
        department ? <Paper elevation={10} className="form_container" sx={{ padding: "50px", maxWidth: "calc(400px + 5vw)", minWidth: "calc(350px + 5vw)" }}>
          <Typography variant='h5' marginBottom={2} textAlign="center" >{department.name}</Typography>
          <Box display="flex" flexDirection="row-reverse" marginBottom={2}>
            <Button onClick={() => setIsEditable(prev => !prev)} startIcon={isEditable ? <Cancel /> : <Edit />} variant="contained">
              {isEditable ? "Cancel" : "Edit"}
            </Button>
          </Box>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} sm={6} >
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Department Name</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={values[field.name]}
                  disabled
                  name="name"
                  value={department.name}
                  label="Department Name"
                >
                  <MenuItem value={department.name}>{department.name}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} padding={0}>
              <TextField

                margin="dense"
                label="Available Seats"
                variant="outlined"
                name="maxCandidate"
                value={department.maxCandidate}
                onChange={handleChange}
                disabled={!isEditable}
                type="number"
                fullWidth
                sx={{ mb: 3, mt: 0 }}
              />
            </Grid>
            {department &&
              //@ts-ignore
              department?.semesters.map((sem) => {
                return (
                  <>
                    <Grid item xs={12} padding={0}>
                      <TextField
                        margin="dense"
                        label="Semester"
                        variant="outlined"
                        name="maxCandidate"
                        value={sem.sem}
                        disabled
                        fullWidth
                        sx={{ mb: 3, mt: 0 }}
                      />
                    </Grid>
                    {
                      sem.subjects.map(subject => {
                        return (
                          <>
                            <Grid item xs={12} sm={6} padding={0}>
                              <TextField
                                margin="dense"
                                label="Subject"
                                variant="outlined"
                                name="subjectName"
                                value={subject.name}
                                disabled
                                fullWidth
                                sx={{ mb: 3, mt: 0 }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} padding={0}>
                              <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Teacher</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  name={`${sem.sem}-${subject.name}`}
                                  label="Teacher"
                                  value={subject.teacher}
                                  //@ts-ignore
                                  onChange={handleTeacherChange}
                                  disabled={!isEditable}
                                >
                                  {
                                    teachers.map(options => {
                                      return (
                                        //@ts-ignore
                                        <MenuItem value={options.email}>{options.name}</MenuItem>
                                      )
                                    })
                                  }
                                  <MenuItem value={""}>Un Select</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </>
                        )
                      })
                    }
                  </>
                )
              })
            }
          </Grid>
          <Grid container direction="row-reverse">
            {
              isEditable ? <Button onClick={handleSubmit} variant="contained">
                Submit
              </Button> : <div></div>
            }
            {/* <Button onClick={() => setDepartment(undefined)} variant="text">
            Clear
          </Button> */}
          </Grid>
        </Paper> : <h1>Loading...</h1>
      }
    </Grid>
  )
}

export default DepartmentDetails