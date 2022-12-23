import { Button, Grid, Paper, TextField, Typography, makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import axios from './axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface FormData {
  name: string;
  qualification: string;
  semesters: Array<{ sem: number; subjects: string[] }>;
}

const NewCourse: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    qualification: '',
    semesters: [{ sem: 1, subjects: [] }],
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSemester = () => {
    setFormData({
      ...formData,
      semesters: [
        ...formData.semesters,
        { sem: formData.semesters.length + 1, subjects: [] },
      ],
    });
  };

  const handleAddSubject = (semesterIndex: number) => {
    const updatedSemesters = formData.semesters.map((semester, index) => {
      if (index === semesterIndex) {
        return {
          ...semester,
          subjects: [...semester.subjects, ''],
        };
      }
      return semester;
    });
    setFormData({ ...formData, semesters: updatedSemesters });
  };

  const handleSubjectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    semesterIndex: number,
    subjectIndex: number
  ) => {
    const updatedSemesters = formData.semesters.map((semester, index) => {
      if (index === semesterIndex) {
        const updatedSubjects = semester.subjects.map((subject, index) => {
          if (index === subjectIndex) {
            return event.target.value;
          }
          return subject;
        });
        return { ...semester, subjects: updatedSubjects };
      }
      return semester;
    });
    setFormData({ ...formData, semesters: updatedSemesters });
  };
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const handleSubmit = () => {
    console.log(formData)
    axios.post("/university/course/add", formData).then(() => navigate("/university/course")).catch(err => {
      console.log(err)
      setError(err.response.data)
    })
  }



  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ "minHeight": "100vh" }}
    >
      <Paper elevation={10} className="form_container" sx={{ padding: "50px", maxWidth: "calc(400px + 5vw)" }}>
        <Grid container spacing={2} marginBottom={2}>
          <form noValidate autoComplete="off">
            <TextField
              margin="dense"
              id="name"
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth

              sx={{ mb: 3 }}
            />
            <TextField
              id="qualification"
              margin="dense"
              label="Qualification"
              variant="outlined"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 3 }}
            />
            {formData.semesters.map((semester, semesterIndex) => (
              <div key={semesterIndex}>
                <TextField
                  margin="dense"
                  id={`sem-${semesterIndex}`}
                  label={`Semester ${semesterIndex + 1}`}
                  variant="outlined"
                  name={`sem-${semesterIndex}`}
                  value={semester.sem}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                {semester.subjects.map((subject, subjectIndex) => (
                  <TextField
                    margin="dense"
                    key={subjectIndex}
                    id={`subject-${semesterIndex}-${subjectIndex}`}
                    label={`Subject ${subjectIndex + 1}`}
                    variant="outlined"
                    name={`subject-${semesterIndex}-${subjectIndex}`}
                    value={subject}
                    onChange={(event) =>
                      //@ts-ignore
                      handleSubjectChange(event, semesterIndex, subjectIndex)
                    }
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                ))}
                <Box display="flex" justifyContent="center" alignItems="center" width="30%">
                  <Button variant='contained' onClick={() => handleAddSubject(semesterIndex)}>
                    Add Subject
                  </Button>
                </Box>
              </div>
            ))}
            <Button onClick={handleAddSemester}>Add Semester</Button>
          </form>
        </Grid>
        <Typography variant='body2' textAlign='center' color="#f00">{error ? error : null}</Typography>
        <Grid container direction="row-reverse" sx={{ mt: 3 }}>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Grid>
      </Paper>
    </Grid>

  );
};

export default NewCourse;
