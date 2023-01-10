import axios from './axios'
import React, { useEffect, useState } from 'react'

// Card 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import BoookImg from "../../assets/book.webp"
import MainHeader from './Components/MainHeader';


const Home = () => {
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    axios.get("/teacher/class/all").then((res) => {
      console.log(res)
      setClasses(res.data)
    })
  }, [])
  return (
    <div>
      <MainHeader />
      <div className='grid grid-cols-6 '>
        {classes &&
          classes.map(obj => {
            return (
              //@ts-ignore
              <ImageCard title={`${obj.subject}`} description={`${obj.department + " - Sem : " + obj.semester}`} url={`/teacher/${obj.department}/${obj.subject}/${obj.semester}`} />
            )
          })
        }
      </div>
    </div>
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
    <div className='m-3'>
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
            <Typography gutterBottom variant="h5" component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" onClick={() => navigate(url)} >
              {title}
            </Typography>
            <Tooltip title={description} placement='top'>
              <Typography variant="body2" color="text.secondary" className='w-full truncate'>
                {description && description}
              </Typography>
            </Tooltip>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}