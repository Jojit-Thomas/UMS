import { Button, Grid, Paper, TextField, Typography, makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import axios from './axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cancel, Edit } from '@mui/icons-material';


interface FormData {
  name: string;
  qualification: string;
  semesters: Array<{ sem: number; subjects: string[] }>;
}

const CourseDetails: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    qualification: '',
    semesters: [{ sem: 1, subjects: [] }],
  });

  const [isEditable, setIsEditable] = useState(false);

  const { name } = useParams()

  useEffect(() => {
    axios.get(`/university/course/${name}`).then((res) => {
      console.log(res)
      setFormData(res.data)
    })
  }, [])


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
    axios.put("/university/course/edit", formData).then(() => navigate("/university/course")).catch(err => {
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
        <Typography variant='h5' marginBottom={2} textAlign="center" >{formData.name}</Typography>
        <Box display="flex" flexDirection="row-reverse" marginBottom={2}>
          <Button onClick={() => setIsEditable(prev => !prev)} startIcon={isEditable ? <Cancel /> : <Edit />} variant="contained">
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </Box>
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
              disabled
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
              disabled={!isEditable}
              sx={{ mb: 3 }}
            />
            {formData.semesters.map((semester, semesterIndex) => (
              <div key={semesterIndex} className='mt-4'>
                <TextField
                  margin="dense"
                  id={`sem-${semesterIndex}`}
                  label={`Semester ${semesterIndex + 1}`}
                  variant="outlined"
                  name={`sem-${semesterIndex}`}
                  value={semester.sem}
                  fullWidth
                  disabled={!isEditable}
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
                    disabled={!isEditable}
                    onChange={(event) =>
                      //@ts-ignore
                      handleSubjectChange(event, semesterIndex, subjectIndex)
                    }
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                ))}
                <Button variant='contained' onClick={() => isEditable && handleAddSubject(semesterIndex)}>
                  Add Subject
                </Button>
              </div>
            ))}
            <Button onClick={() => isEditable && handleAddSemester()} >Add Semester</Button>
          </form>
        </Grid>
        <Typography variant='body2' textAlign='center' color="#f00">{error ? error : null}</Typography>
        <div className='flex flex-row-reverse'>
          <Button disabled={!isEditable} onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </div>
      </Paper>
    </Grid>

  );
};

export default CourseDetails;
