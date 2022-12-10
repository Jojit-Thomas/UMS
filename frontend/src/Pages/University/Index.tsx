import axios from '../../axios'
import React, { useEffect } from 'react'

function Index() {
  useEffect(() => {
    axios.get("/university").then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div>Index</div>
  )
}

export default Index