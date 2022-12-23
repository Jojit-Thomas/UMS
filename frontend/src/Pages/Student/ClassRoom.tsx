import { Send } from '@mui/icons-material'
import { Box, Grid, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const ClassRoom = () => {
  const { classId, subject } = useParams()

  const [input, setInput] = useState("");

  const [chat, setChat] = useState([])

  useEffect(() => console.log(input), [input])

  const handleSubmit = () => {
    
  }

  return (
    <Box margin={4} marginTop={5}>
      <Image></Image>
      <Grid container height="80vh" paddingY={5}>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={9} height="100%">
          <Grid container flexDirection="column" spacing={3}>
            <Grid item>
              <Paper elevation={3}>
                <ChatBar>
                  <Box width="4rem" height="100%" display="flex" justifyContent="center" alignContent="center">
                    <Circle />
                  </Box>
                  <Box width="calc(100% - 8rem)">
                    <TextField fullWidth id="standard-basic" label="Announce something to the class" variant="standard" value={input} onChange={(e) => setInput(e.target.value)} />
                  </Box>
                  <Box width="4rem" height="100%" display="flex" justifyContent="center" alignContent="center">
                    <div style={{ margin: "auto" }}>
                      <Send />
                    </div>
                  </Box>
                </ChatBar>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3}>
                <ChatBar />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

const Circle = styled.div`
  width : 2.5rem;
  height : 2.5rem;
  background-color : #EBEBEB;
  border-radius : 100px;
  margin : auto
`

const ChatBar = styled.div`
  width : 100%;
  height : 3.3rem;
  background-color : #fff;
  display : flex;

`

const Image = styled.div`
  width : 100%;
  height : 20vh;
  background-color : #EBEBEB;
  border-radius : 5px;
`

export default ClassRoom