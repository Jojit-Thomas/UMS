import React from 'react'
import FormikInput from './FormikInput'


const FormikControl = (props: any) => {
  const { control, ...rest } = props
  switch (control) {
    case 'input': return <FormikInput {...rest} />
    case 'textarea':
    case 'select':
    case 'date':
    default: return null
  }
  // return (
  //   <div>FormikControl</div>
  // )
}

export default FormikControl