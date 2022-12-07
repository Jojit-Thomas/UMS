import axios from '../../axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea } from '@mui/material';
import busLogo from "../../images/bus.webp"
import Header from '../../Components/Header/Header';

function Home() {
  let navigate = useNavigate()
  interface bus_type {
    _id: String,
    name: String,
    row: Number,
    col: Number,
    fare: Number,
    from: String,
    to: String,
  }
  const [buses, setBuses] = useState<bus_type[]>([])
  useEffect(() => {
    axios.get("/bus").then((result) => {
      console.log(result)
      setBuses(result.data)
    }).catch((err) => {
      console.table(err)
      navigate("/login")
    })
  }, [])
  // useEffect(() => {
  //   axios.get("/").catch(() => {
  //     localStorage.removeItem("accessToken")
  //     localStorage.removeItem("refreshToken")
  //     navigate('/login')
  //   })
  // }, [])
  

  const handleClick = (id : String) => {
    navigate(`/bus/${id}`)
  }

  // const [isLoading, setIsLoading] = useState(true)
  // useEffect(() => setIsLoading(false),[])

  return <>
  <Header/>
    <DataBox>
      {
        buses.map((bus, idx) => {
          return (
            <Card sx={{ maxWidth: 345, maxHeight: 345, marginX: 1.5, marginY: 3 }} onClick={() => handleClick(bus._id)} key={idx}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={busLogo}
                  alt="green iguana"
                  />
                <CardContent>
                  <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="0px">
                    <Typography gutterBottom variant="h5" component="div">
                      {bus.name}
                    </Typography>
                    <Typography variant="body1" color="success.main">{"₹ " + bus.fare}</Typography>
                  </Box>
                  <Typography>{bus.from} - {bus.to}</Typography>

                  <Typography variant="body2" color="text.secondary">{bus.row + "X" + bus.col}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    A bus is a large wheeled vehicle meant to carry many passengers along with the bus driver
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })
      }
    </DataBox>
  </>
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: grid;
grid-template-columns: 15% 85%;
@media screen and (max-width: 720px) {
  grid-template-columns: 0% 100%;
}
`

const DataBox = styled.div`
  padding: 40px 150px;
  display: flex;
  // justify-content: space-around;
  flex-wrap : wrap;
  align-content: flex-start;
`


export default Home

