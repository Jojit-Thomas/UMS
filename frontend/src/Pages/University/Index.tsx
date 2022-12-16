import axios from './axios'
import { Fragment, useEffect, useState } from 'react'
import { Dashboard, School } from '@mui/icons-material'
import Sidebar, { Tab } from '../../Components/Sidebar'
import styled from 'styled-components'

function Index() {
  useEffect(() => {
    axios.get("/university").then((data) => {
      console.log(data)
    })
  }, [])

  const tab: Array<Tab> = [
    {
      name: "Dashboard",
      linkTo: "/university",
      icon: <Dashboard />
    },
    {
      name: "College",
      linkTo: "/university/college",
      icon: <School />
    }
  ]
  const [active, setActive] = useState("");
  return <Container>
    <Sidebar title='Tempe University' tab={tab} active={{ active, setActive }} />
    <div>

    </div>
  </Container>
}

export default Index

const Container = styled.div`
width : 100vw;
height : 100vh;
display : grid;
grid-template-columns : calc(200px + 5vw) calc(95vw - 200px);
`