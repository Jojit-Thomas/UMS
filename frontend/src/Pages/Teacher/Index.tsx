import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { setDetails } from './teacherSlice';

function Index() {
  const dispatch = useDispatch();
  useEffect(() => {
    const local = localStorage.getItem("teacher")
    if (local) {
      let { user } = JSON.parse(local)
      dispatch(setDetails(user))
    }
  },[])
  return (
    <Outlet />
  )
}

export default Index