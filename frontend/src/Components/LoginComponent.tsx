import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface Fields {
  id: number,
  name: string,
  label: string
}



function LoginComponent({ handleChange, handleSubmit, fields, error }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: () => void, fields: Array<Fields>, error: string }) {
 
  const location = useLocation();
 
 return <Fragment>
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{"minHeight" : "100vh"}}
      className="login-page"
    >
      <Paper elevation={10} className="form_container" sx={{"padding" : "30px", "maxWidth" : "calc(250px + 5vw)"}}>
        {
          fields.map(field => {
            return (
              <TextField key={field.id}
                name={field.name}
                id="outlined-error-helper-text"
                label={field.label}
                fullWidth
                onChange={handleChange}
                sx={{ "margin": "10px 0px" }}
              />
            )
          })
        }
        <Typography variant='body2' textAlign='center' color="#f00">{error ? error : null}</Typography>
        <div className="flex flex-row-reverse mb-2 -mt-1">
          <Button onClick={handleSubmit} variant="contained">
            Login
          </Button>
        </div>
        <Grid container justifyContent="center" className="hyperlink">Don't have an account? <Link to={`/${location.pathname.split("/")[1]}/register`} className='text-blue-500 underline ml-1'>Register</Link></Grid>
      </Paper>
    </Grid>
  </Fragment>
}

export default LoginComponent