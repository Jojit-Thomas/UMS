import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';

const Course = () => {


  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/university/course/all')
      .then((res) => {
        console.log(res.data)
        setCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 10 },
    { field: 'qualification', headerName: 'Qualification', flex: 10 },
    {
      field: 'isApproved', headerName: 'Is Approved', flex: 10, renderCell: (params: GridRenderCellParams) => (
        <Button variant='outlined' onClick={() => navigate(`/university/course/${params.row.name}`)} >Detailed View</Button>
      ),
    },
  ];

  return (
    <div className='w-full '>
      <Box padding={5}>
        <div className='flex flex-row-reverse py-2'>
          <Button variant='contained' startIcon={<Add />} onClick={() => navigate("/university/course/add")} >New Course</Button>
        </div>
        <DataTable rows={course} cols={cols} uniqueKey="name" />
      </Box>
    </div>
  )
}

export default Course