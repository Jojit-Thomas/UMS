import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../utils/store'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ArrowBackIos } from '@mui/icons-material'

const MainHeader = () => {

  const details = useSelector((state: RootState) => state.student.details)
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("studentAccessToken")
    localStorage.removeItem("studentRefreshToken")
    localStorage.removeItem("student")
    navigate("/student/login", { replace: true })
  }

  return (
    <div className='w-full h-14 bg-indigo-50 grid grid-cols-3'>
      <div className='px-4'>
        <div className='h-full w-10 flex' onClick={() => navigate("/")}>
          <ArrowBackIos className='m-auto' />
        </div>
      </div>
      <div></div>
      <div className='flex flex-row-reverse px-5'>
        <Dropdown className='ml-auto mr-5 my-auto '>
          <div className="dropdown inline-block relative">
            <div className='flex'>
              <div className='my-auto'>
                <h3 className='text-lg' >{details.name}</h3>
                <h5 className='text-xs' >{details.classId}</h5>
              </div>
              <div className='flex ml-2'>
                <img src={`https://api.multiavatar.com/${details.name}.png`} className='w-10 h-10 my-auto' alt="" />
              </div>
            </div>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 right-0">
              <li className="" onClick={() => logout()} ><span className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Logout</span></li>
            </ul>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default MainHeader

const Dropdown = styled.div`
.dropdown:hover .dropdown-menu {
  display: block;
}`