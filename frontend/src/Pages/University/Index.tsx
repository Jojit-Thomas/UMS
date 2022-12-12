import axios from './axios'
import React, { useEffect } from 'react'

function Index({title} : {title : string}) {
  useEffect(() => {
    axios.get("/university").then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div>{title}</div>
  )
}

export default Index