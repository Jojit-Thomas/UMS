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
          <div className='flex h-full'  ><h3 className='color-[#666] mr-1 my-auto'>College </h3><Title className='my-auto'>Dashboard</Title></div>
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