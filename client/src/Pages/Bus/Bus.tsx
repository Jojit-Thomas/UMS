import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Bus.css"
import styled from "styled-components"
import { useParams } from 'react-router-dom'
import axios from '../../axios'
import { Box } from '@mui/system'
import Seat from '../../Components/Seat'

interface BusContainerProps {
  row: number,
  col: number
}

interface slot_type {
  id : string,
  isReserved : boolean,
  user : String
}

interface bus_type {
  _id: string,
  name: string,
  row: number,
  col: number,
  fare: number,
  from: string,
  to: string,
  slots:  Array<Array<slot_type>>
}

function Bus() {
  let { busid } = useParams()
  let [busDetails, setBusDetails] = useState<bus_type>({
    _id: "",
    name: "",
    row: 0,
    col: 0,
    fare: 0,
    from: "",
    to: "",
    slots: [],
  })
  useEffect(() => {
    axios.get(`/bus/${busid}`).then((res) => {
      console.log(res)
      setBusDetails(res.data)
    })
  }, [])

  // const [busRow, setBusRow] = useState<number[]>([])
  // const [busCol, setBusCol] = useState<number[]>([])
  // useEffect(() => {
  //   setBusRow(Array(busDetails.row).fill(1))
  //   setBusCol(Array(busDetails.col).fill(1))
  // }, [busDetails])

  const [selectedSeat,setSelectedSeat] = useState<string>();

  const bookSeat = () => {
    axios.post("/bus/book", {
      busId : busid,
      slotId : selectedSeat,
      user : localStorage.getItem("user")
    }).then(() => {
      axios.get(`/bus/${busid}`).then((res) => {
        setBusDetails(res.data)
        setSelectedSeat(undefined)
      })
    })
  }

  return <>
    <Grid
      className='bus-outer'
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <Title>{busDetails.name}</Title>
        <BusContainer row={busDetails.row * 105} col={busDetails.col * 100}>
          {
            busDetails.slots.map((row , i) => {
              return (
                <Box key={i} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="0px">
                  {
                    row.map((seatObj, i) => {
                      return(
                        seatObj.isReserved ? <Seat isReserved selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} seatObj={seatObj} key={i} /> : <Seat selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} seatObj={seatObj} key={i} />
                      )
                    })
                  }
                </Box>
              )
            })
          }
        </BusContainer>
        {
        selectedSeat && <Grid container direction="row-reverse" marginTop={2}>
            <Button onClick={bookSeat} variant="contained">
              Continue
            </Button>
          </Grid> 
          }
    </Grid>
    </Grid>
  </>
}

const BusContainer = styled.div<BusContainerProps>`FU
  width: ${props => `${props.col}px`};
  height: ${props => `${props.row}px`};
  border: solid 4px #777;
  padding: 20px;
`



// const SeatReserved = styled.div`
//   width: 80px;
//   height: 80px;
//   margin: 10px;
//   background-color: #a4a4a4;
// `

const Title = styled.h1`
  text-align:center
`


export default Bus