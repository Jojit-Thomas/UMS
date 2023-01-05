import { Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import DataTable from '../../Components/DataTable';
import { Add } from '@mui/icons-material';

const Department = () => {

  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/college/department/all')
      .then((res) => {
        console.log(res.data)
        setCourse(res.data.department);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 10 },
    { field: 'qualification', headerName: 'Qualification', flex: 10 },
    {
      field: '', headerName: 'Actions', flex: 10, renderCell: (params: GridRenderCellParams) => (
        <Button variant='outlined' onClick={() => navigate(`/college/department/${params.row.name}`)} >Detailed View</Button>
      ),
    },
  ];
  return (
    <Box width="100%">
      <Box padding={5}>
        <div className='flex flex-row-reverse py-2'>
          <Button variant='contained' startIcon={<Add />} onClick={() => navigate("/college/department/add")} >New Department</Button>
        </div>
        <DataTable rows={course} cols={cols} uniqueKey="name" />
      </Box>
    </Box>
  )
}

export default Department