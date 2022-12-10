import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export interface Fields {
  id: number,
  name: string,
  label: string
}



function LoginComponent({ handleChange, handleSubmit, fields, error }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, handleSubmit: () => void, fields: Array<Fields>, error: string }) {
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
        <Grid container direction="row-reverse">
          <Button onClick={handleSubmit} variant="contained">
            Login
          </Button>
        </Grid>
        <Grid container justifyContent="center" className="hyperlink">Don't have an account? <Link to="/register">Register</Link></Grid>
      </Paper>
    </Grid>
  </Fragment>
}

export default LoginComponent