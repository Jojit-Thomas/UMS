import { Paper } from '@mui/material'
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export interface Tab {
  name: string,
  linkTo: string,
  icon: React.ReactElement
}

function Sidebar({ title, tab, active }: { title: string, tab: Array<Tab>, active: { active: string, setActive: Function } }) {
  const navigate = useNavigate()


  return <Fragment>
    <SidebarContainer>
      <Paper elevation={7}>
        <div>
          <Title>{title}</Title>
        </div>
        {
          tab.map(val => {
            return (
              <ListItem onClick={() => { active.setActive(val.name); navigate(val.linkTo) }} active={active.active === val.name ? true : false} >
                <div id="item">
                  {val.icon}
                  <h4>{val.name}</h4>
                </div>
              </ListItem>
            )
          })
        }
      </Paper>
    </SidebarContainer>
  </Fragment>
}

export default Sidebar

const Title = styled.h3`
color : #707070;
margin : 1rem 0rem;
margin-left : 2rem;
`

const ListItem = styled.div<{ active: boolean }>`
  margin : 0.5rem 0rem;
  width : 100%;
  border-radius : 0.4rem;
  height: 3rem;
  color : ${p => p.active ? "#fff" : "#707070"};
  background-color : ${p => p.active ? "#5884ff" : "#fff"};
  &:hover {
    color : #fff;
    background-color : #5884ff;
  }
  display: flex;
  #item {
    display : flex;
    margin : auto;
    margin-left : 2rem;
    h4 {
      margin : auto;
      margin-left : 0.5rem;
    }
  }
`

const SidebarContainer = styled.div`
  width : 100%;
  height : 100%;
  display : grid;

`