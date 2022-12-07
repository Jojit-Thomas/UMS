import React from 'react'
import styled from "styled-components"

interface SeatComponentProps {
  // isReserved : boolean
  bgColor: string
  borderColor: string
}

interface slot_type {
  id: string,
  isReserved: boolean,
  user: String
}

function Seat({ isReserved = false, selectedSeat, setSelectedSeat, seatObj }: { isReserved?: boolean, selectedSeat: string | undefined, setSelectedSeat: Function, seatObj: slot_type }) {
  return <SeatComponent onClick={() => setSelectedSeat((current: string) => isReserved ? current : seatObj.id)} bgColor={isReserved ? "#acacac" : "#000"} borderColor={selectedSeat === seatObj.id ? "#42ba96" : "#fff"} >
    <span style={{ "color": "#fff" }}>{seatObj.id}</span>
  </SeatComponent>
}

const SeatComponent = styled.div<SeatComponentProps>`
  width: 80px;
  height: 80px;
  margin: 7px;
  background-color: ${props => props.bgColor};
  border: solid 5px #fff; 
  outline-color : ${props => props.borderColor};
  outline-style : dashed;
  &:hover {
    opacity : 0.9;
    //background-color: red; // <Thing> when hovered
  }
`

export default Seat