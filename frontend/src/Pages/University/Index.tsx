import axios from './axios'
import { Fragment, useEffect, useState } from 'react'
import { AutoStories, Dashboard, School } from '@mui/icons-material'
import Sidebar, { Tab } from '../../Components/Sidebar'
import styled from 'styled-components'
import { Outlet, useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '../../Components/Header'

function Index() {


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
    },
    {
      name: "Course",
      linkTo: "/university/course",
      icon: <AutoStories />
    },
  ]

  const location = useLocation();
  const notRestrictedRoutes = ["login"]
  let path: string[] | string = location.pathname.split("/")
  path.splice(0, 2)
  path = path.join("/")

  useEffect(() => {
    //@ts-ignore
    if(!notRestrictedRoutes.includes(path)){
      axios.get("/university").then((data) => {
        console.log(data)
      })
    }
  }, [])

  return (
    <>
      {
        (!notRestrictedRoutes.includes(path)) ? <SidebarContainer>
          <Sidebar title='Tempe University' tab={tab} />
          <Box>
            <Header user="User" logout={() => { }} />
            <Outlet />
          </Box>
        </SidebarContainer>
          : <Outlet />
      }
    </>
  )
}

export default Index

const SidebarContainer = styled.div`
width : 100vw;
height : 100vh;
display : grid;
grid-template-columns : calc(200px + 5vw) calc(95vw - 200px);
`