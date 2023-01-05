import React, { Fragment } from 'react'
import Hero from '../assets/Hero.png'
import CrowdImg from '../assets/Crowd.png'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate();
  return (
    <div className='overflow-x-hidden'>
      <div className='h-[35vh] md:h-[50vh] md:h-[70vh] xl:h-full w-screen '>
        <div className='absolute bg-white bg-opacity-10 w-full h-16 grid grid-cols-3'>
          <div className="w-full h-full flex mx-5">
            <h3 className='text-white my-auto w-[12%] text-xl'>Home</h3>
            <h3 className='text-white my-auto w-[12%] text-xl'>Careers</h3>
          </div>
          <div></div>
          <div className='w-full h-full flex'>
            <Dropdown className='ml-auto mr-5 my-auto '>
              <div className="dropdown inline-block relative">
                <button className="py-2 px-4 rounded inline-flex items-center border border-2 border-white">
                  <h3 className='text-white '>Who are you ?</h3>
                  <svg className="fill-white ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 right-0">
                  <li className="" onClick={() => navigate("/student")} ><span className='rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Student</span></li>
                  <li className="" onClick={() => navigate("/teacher")} ><span className=' bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>Teacher</span></li>
                  <li className="" onClick={() => navigate("/college")} ><span className=' bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>College</span></li>
                  <li className="" onClick={() => navigate("/university")} ><span className='rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap'>University</span></li>
                </ul>
              </div>
            </Dropdown>
          </div>
        </div>
        <img className='h-full w-full object-cover' src={Hero} alt="" />
      </div>
      <div className='text-white w-screen h-[130vh] sm:h-[80vh] bg-black bg-opacity-95 p-10 overflow-visible'>
        <p className=''>Do Global</p>
        <h3 className=' text-6xl mt-2'>Your opportunities just went global</h3>
        <p className=' text-xl mt-5 sm:mt-16 w-11/12 sm:w-8/12'>To work effectively across borders and cultures, you need to be a part of diverse teams on a daily basis, and travel as much as possible. At Hult, that’s exactly what you’ll do.</p>
        <div className='w-[90%] h-[50%] md:h-[40%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8'>
          <div className=' w-full h-full flex flex-col justify-center px-10'>
            <h4 className='text-9xl mx-auto'>150</h4>
            <h5 className='mx-auto'>nationalities represented in 2021 student body</h5>
          </div>
          <div className=' w-full h-full flex flex-col justify-center px-10'>
            <h4 className='text-9xl mx-auto'>60</h4>
            <h5 className='mx-auto'>of students work abroad after graduation</h5>
          </div>
          <div className=' w-full h-full flex flex-col justify-center px-10'>
            <h4 className='text-9xl mx-auto'>7</h4>
            <h5 className='mx-auto'>Hult campuses worldwide: study in Boston, London, San Francisco, Dubai, and Shanghai</h5>
          </div>
        </div>
          <p className=' mt-16'>Download our brochure to find out more about our uniquely global undergraduate degree.</p>
      </div>
      <div className='w-screen h-[60vh] bg-yellow-50 grid grid-cols-1 sm:grid-cols-2 px-12 sm:px-40 xl:px-64 2xl:px-80 pt-12 sm:pt-0'>
        <div className='w-full h-full flex flex-col justify-center'>
          <p className='mr-10  font-mono font-semibold'>“The world needs a university that graduates men and women who are not only capable and knowledgeable, but who accept their responsibility to serve others – especially those in greatest need.”</p>
          <p className='mt-10 ml-auto mr-10 font-mono font-semibold'>— Rev. John I. Jenkins, C.S.C.</p>
        </div>
        <div className='w-full h-full flex justify-center'>
          <img className=' h-2/3 my-auto' src={CrowdImg} alt="" />
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Index

const Dropdown = styled.div`
.dropdown:hover .dropdown-menu {
  display: block;
}`