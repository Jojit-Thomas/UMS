import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar, { Tab } from '../../Components/Sidebar'
import Header from '../../Components/Header'
import { Book, Dashboard } from '@mui/icons-material'
import styled from 'styled-components'
import { Box } from '@mui/system'

const Index = () => {
  const tab: Array<Tab> = [
    {
      icon: <Dashboard />,
      linkTo: "/college",
      name: "Dashboard"
    },
    {
      icon: <Book />,
      linkTo: "/college/application",
      name: "Applications"
    },
    {
      icon: <Book />,
      linkTo: "/college/department",
      name: "Department"
    },
    {
      icon: <Book />,
      linkTo: "/college/teacher",
      name: "Teachers"
    },
    {
      icon: <Book />,
      linkTo: "/college/student",
      name: "Students"
    }
  ]

  const location = useLocation();
  const notRestrictedRoutes = ["login", "register"]
  let path: string[] | string = location.pathname.split("/")
  path.splice(0, 2)
  path = path.join("/")

  return (
    <>
      {
        (!notRestrictedRoutes.includes(path)) ? <SidebarContainer>
          <div className='hidden md:grid w-screen h-screen grid-cols-12'>
            <Sidebar title='Tempe University' tab={tab} className='col-span-2' />
            <div className='col-span-10'>
              <Header user="User" logout={() => { }} />
              <Box padding={4}>
                <Outlet />
              </Box>
            </div>
          </div>
          <div className='block md:hidden w-screen h-screen'>
            <Outlet />
          </div>
        </SidebarContainer> :
          <Outlet />
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