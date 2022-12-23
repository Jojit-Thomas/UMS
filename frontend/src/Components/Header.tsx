import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components';

function Header({ user, logout }: { user: string, logout: () => void }) {

  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <Paper elevation={4} square={true} sx={{ width: "100%" }} >
        <Box width="100%" height="100%" display="grid" alignItems="center" justifyContent="center" >
          <Box display="flex" height="100%" ><h3 style={{ "color": "#666", "marginRight": "0.3rem" }}>College </h3><Title>Dashboard</Title></Box>
        </Box>
      </Paper>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
display : flex;
width : 100%;
height : 3rem;
// background-color : #f00;
`

const Title = styled.h3`
color : #66f;
`