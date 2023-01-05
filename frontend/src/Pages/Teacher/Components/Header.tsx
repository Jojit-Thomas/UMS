import { Menu } from '@mui/icons-material'
import React from 'react'
import { useParams } from 'react-router-dom'

const Header = ({ active, setShowPeople }: { active: string, setShowPeople : React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { subject } = useParams()
  const commonCss = "inline-block px-4 py-2 border-b-4 cursor-pointer";
  const acitveCss = " text-blue-600  border-blue-600 active dark:text-blue-500 dark:border-blue-500"
  const notAcitveCss = " border-transparent hover:text-blue-600 hover:border-blue-500 dark:hover:text-blue-500"
  return (
    <div className='w-full h-14 bg-gray-200 grid grid-cols-3'>
      <div className='flex ml-5 my-auto'>
        <Menu className='scale-150' />
        <h3 className='ml-3'>{subject}</h3>
      </div>
      <div className="text-md font-semibold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 m-auto">
        <ul className="hidden md:flex flex-wrap -mb-px ">
          <li className="mr-2">
            <span className={`${commonCss}${active === "community" ? acitveCss : notAcitveCss}`} >Community</span>
          </li>
          <li className="mr-2">
            <span className={`${commonCss}${active === "classwork" ? acitveCss : notAcitveCss}`} aria-current="page">Classwork</span>
          </li>
          <li className="mr-2">
            <span className={`${commonCss}${active === "people" ? acitveCss : notAcitveCss}`} onClick={() => setShowPeople(prev => !prev)} >People</span>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  )
}

export default Header