import { Outlet } from 'react-router-dom'
import axios from './axios'
import React, { Fragment, useEffect } from 'react'

function Index() {
  return (
    <Fragment>
      <Outlet/>
    </Fragment>
  )
}

export default Index