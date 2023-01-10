import { Outlet } from 'react-router-dom'
import axios from './axios'
import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setDetails } from './studentSlice';

function Index() {

  const dispatch = useDispatch();

  useEffect(() => {
    const local = localStorage.getItem("student")
    if (local) {
      let { user } = JSON.parse(local)
      dispatch(setDetails(user))
    }
  }, [])

  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}

export default Index