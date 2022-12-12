import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Values } from '../Pages/Student/Register'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface Fields {
  id: number,
  name: string,
  label: string
}

export interface Select {
  id: number,
  name: string,
  label: string,
  options: Array<{
    value: string,
    label: string
  }>
}

function RegisterForm({ handleChange, handleSubmit,handleClear, handleSelectChange, handleDateChange, values, fields, selectFields, error }:
  {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSelectChange: (e: SelectChangeEvent) => void,
    handleSubmit: () => void, fields: Array<Fields>,
    handleDateChange : (e: any) => void,
    handleClear : () => void,
    values: Values
    selectFields: Array<Select>, error: string
  }) {
    
  return <Fragment>
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ "minHeight": "100vh" }}
      className="login-page"
    >
      <Paper elevation={10} className="form_container" sx={{ "padding": "30px", "maxWidth": "calc(550px + 5vw)" }}>
        <Grid container spacing={2} marginBottom={2}>
          {
            fields.map(field => {
              return (
                <Grid item xs={6}>
                  <TextField key={field.id}
                    name={field.name}
                    id="outlined-error-helper-text"
                    label={field.label}
                    //@ts-ignore
                    value={values[field.name]}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              )
            })
          }
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={6}>
            <DesktopDatePicker
              label="Date of Birth"
              inputFormat="YYYY/MM/DD"
              value={values.DOB}
              //@ts-ignore
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />  
          </Grid>
          </LocalizationProvider>
          {
            selectFields.map(field => {
              return (
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //@ts-ignore
                      value={values[field.name]}
                      name={field.name}
                      label={field.label}
                      onChange={handleSelectChange}
                    >
                      {
                        field.options.map(options => {
                          return (
                            <MenuItem value={options.value}>{options.label}</MenuItem>
                          )
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>
              )
            })
          }
          <Grid item xs={12}>
            <TextField
              name="address"
              id="outlined-error-helper-text"
              label="Address"
              fullWidth
              minRows={4}
              maxRows={6}
              multiline
              onChange={handleChange}
            />
          </Grid>
          <Typography variant='body2' textAlign='center' color="#f00">{error ? error : null}</Typography>
        </Grid>
        <Grid container direction="row-reverse">
          <Button onClick={handleSubmit} variant="contained">
            Pay Now
          </Button>
          {/* <Button onClick={handleClear} variant="text">
            Clear
          </Button> */}
        </Grid>
      </Paper>
    </Grid>
  </Fragment>
}

export default RegisterForm
