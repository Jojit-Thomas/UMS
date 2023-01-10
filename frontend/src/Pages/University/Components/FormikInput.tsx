import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface Props {
  [x: string]: React.HTMLInputTypeAttribute;
}

const FormikInput = (props: Props) => {
  const { label, name } = props
  return (
    <div  className="relative w-11/12 mx-auto mb-4">
      <label htmlFor={name} className="absolute left-1 -top-3 pointer-events-none text-gray-600 text-sm transition-all duration-200 ease-in-outbg-white peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm bg-white-blur2 px-2 " >{label}</label>
      <Field id={name} name={name} className="w-full h-12 pl-3 text-gray-900 placeholder-transparent border-2 rounded-lg appearance-none border-violet-300 peer focus:outline-none focus:border-purple-600 bg-transparent" placeholder='room name' /> 
      <ErrorMessage name={name} className='text-red-600' />
    </div>
  )
}


export default FormikInput