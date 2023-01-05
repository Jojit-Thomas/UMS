import React from 'react'
import { useParams } from 'react-router-dom'
import {Formik, Form} from 'formik'
import * as Yup from "yup"

const CourseDetails = () => {
  const {course} = useParams();
  const initalValues = {};
  const validationSchema = {};
  const onSubmit = (values: any) => console.log("form data : ", values)

  return (
    <div className='w-full h-screen bg-slate-50'>
      <Formik initialValues={initalValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
          formik => <Form>

            <button type='submit'>Submit</button>
          </Form>
        }
      </Formik>
    </div>
  )
}

export default CourseDetails