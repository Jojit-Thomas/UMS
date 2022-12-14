import axios from './axios'
import React, { useEffect } from 'react'

function Index() {
  useEffect(() => {
    axios.get('/student').then(() => { }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div>Student Home Page</div>
  )
}

export default Index