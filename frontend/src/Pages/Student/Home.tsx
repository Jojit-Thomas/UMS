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
import BoookImg from "../../assets/book.webp"


const Home = () => {
  const [subjects, setSubjects] = useState([]);
  const classId = localStorage.getItem("studentClass")
  useEffect(() => {
    axios.get("/student/subject/all").then((res) => {
      console.log(res)
      setSubjects(res.data.subjects)
    })

  }, [])
  return (
    <div className='grid grid-cols-6 ' >
      {
        subjects.map(obj => {
          return (
            //@ts-ignore
            <ImageCard title={obj.name} description={obj.name} url={`/student/${classId}/${obj.name}`} />
          )
        })
      }
    </div>
  )
}

export default Home


function ImageCard({ title, description, url }: { title: string, description?: string, url: string }) {
  const navigate = useNavigate();
  return (
    <div className='m-3' >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            onClick={() => navigate(url)}
            component="img"
            height="140"
            image={BoookImg}
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
    </div>
  );
}