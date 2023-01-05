import { ErrorMessage, Field } from 'formik'
import React from 'react'

interface Props {
  label: string,
  name: string,

}

const FormikInput = (props: Props) => {
  const { label, name } = props
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} />
      <ErrorMessage name={name} className='text-red-600'/>
    </div>
  )
}

export default FormikInput