import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import axios from './axios'
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const NewDepartment = () => {

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

  const [course, setCourse] = useState<Department[]>();

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get("/college/course/all").then((res) => {
      res.data.forEach((course: Department) => {
        //@ts-ignore
        course.semesters.forEach(semester => semester.subjects = semester.subjects.map(subject => ({ name: subject, teacher: null })));
        course.maxCandidate = 0;
      })
      console.log("udpated version", res.data)
      setCourse(res.data)
    })
    axios.get('/college/teacher/all').then((res) => {
      console.log(res.data)
      setTeachers(res.data)
    })
  }, [])

  const [selectedCourse, setSelectedCourse] = useState<Department>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxCandiate = parseInt(e.target.value)
    setSelectedCourse({ ...selectedCourse!, maxCandidate: maxCandiate })
  }
  const handleSelectChange = (e: SelectChangeEvent) => {
    console.log(course?.find(x => x.name === e.target.value))
    setSelectedCourse(course?.find(x => x.name === e.target.value)!)
  }

  const handleTeacherChange = (e: SelectChangeEvent) => {
    console.log(e.target.name, e.target.value)
    const [input, teacher] = [e.target.name, e.target.value]
    const [sem, subject] = input.split('-');
    const semIndex = parseInt(sem) - 1;
    const subIndex = selectedCourse!.semesters[semIndex].subjects.findIndex(s => s.name === subject);
    selectedCourse!.semesters[semIndex].subjects[subIndex].teacher = teacher;
    setSelectedCourse({ ...selectedCourse! })
  }

  const navigate = useNavigate()

  const handleSubmit = () => {
    axios.post("/college/department/add", selectedCourse).then(() => navigate('/college/department')).catch(err => console.log(err))
  }

  useEffect(() => console.log(selectedCourse), [selectedCourse])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ "minHeight": "100vh" }}
      className="login-page"
    >

      <Paper elevation={10} className="form_container" sx={{ padding: "50px", maxWidth: "calc(400px + 5vw)", minWidth: "calc(350px + 5vw)" }}>
        <Typography variant='h5' marginBottom={2} textAlign="center" >New Department</Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6} >
            <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label">Department Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={values[field.name]}
                name="name"
                label="Department Name"
                //@ts-ignore
                onChange={handleSelectChange}
              >
                {course &&
                  //@ts-ignore  
                  course.map(options => {
                    return (
                      <MenuItem value={options.name}>{options.name}</MenuItem>
                    )
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} padding={0}>
            <TextField

              margin="dense"
              label="Available Seats"
              variant="outlined"
              name="maxCandidate"
              // value={course}
              disabled={selectedCourse ? false : true}
              onChange={handleChange}
              type="number"
              fullWidth
              sx={{ mb: 3, mt: 0 }}
            />
          </Grid>
          {selectedCourse &&
            //@ts-ignore
            selectedCourse?.semesters.map((sem) => {
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
                                //@ts-ignore
                                onChange={handleTeacherChange}
                              >
                                {
                                  teachers.map(options => {
                                    return (
                                      //@ts-ignore
                                      <MenuItem value={options.email}>{options.name}</MenuItem>
                                    )
                                  })
                                }
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
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
          {/* <Button onClick={() => setSelectedCourse(undefined)} variant="text">
            Clear
          </Button> */}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default NewDepartment