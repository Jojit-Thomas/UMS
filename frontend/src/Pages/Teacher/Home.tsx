import axios from './axios'
import React, { useEffect, useState } from 'react'

// Card 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';


const Home = () => {
  const [classes, setClasses] = useState([]);
  const classId = localStorage.getItem("studentClass")
  useEffect(() => {
    axios.get("/teacher/class/all").then((res) => { 
      console.log(res)
      setClasses(res.data)
    })
  }, [])
  return (
    <Grid container spacing={2} margin={2}>
      {classes && 
        classes.map(obj => {
          return(
            //@ts-ignore
            <ImageCard title={`${obj.subject + " - Sem : " + obj.semester }`} description={`${obj.department}`} url={`/student/${classId}/${obj.name}`} />
          )
        })
      }
    </Grid>
  )
}

export default Home

const DataBox = styled.div`
  padding: 40px 150px;
  display: flex;
  // justify-content: space-around;
  flex-wrap : wrap;
  align-content: flex-start;
`


function ImageCard({ title, description, url }: { title: string, description?: string, url: string }) {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          onClick={() => navigate(url)}
          component="img"
          height="140"
          image="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/05/28184543/List-of-Humanities-Subjects.png"
          alt="green iguana"
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description && description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  );
}