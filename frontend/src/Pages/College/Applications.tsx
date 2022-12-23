import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable'
import axios from './axios';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import BlockButton from '../University/Components/BlockButton';
import { Box } from '@mui/system';
import { Button } from '@mui/material';



const Applications = () => {
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    axios.get("/college/teacher/application").then((res) => {
      console.log(res.data)
      setTeacher(res.data)
    })
  }, [])

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 10, minWidth: 100 },
    { field: 'collegeId', headerName: 'College ID', flex: 8, minWidth: 100 },
    { field: 'subject', headerName: 'Subject', flex: 8, minWidth: 100 },
    { field: 'skills', headerName: 'Skills', flex: 8, minWidth: 100 },
    { field: 'qualification', headerName: 'Qualification', flex: 8, minWidth: 100 },
    { field: 'totalMark', headerName: 'Mark', flex: 3, minWidth: 50 },
    { field: 'contact', headerName: 'Contact', flex: 10, minWidth: 100 },
    { field: 'email', headerName: 'Email', flex: 15, minWidth: 100 },
    {
      field: 'isApproved', headerName: 'Is Approved', flex: 8, renderCell: (params: GridRenderCellParams) => (

        <ApproveButton params={params} URL="/college/teacher/application/approve" teacher={{ teacher, setTeacher }} />
      ),
    },
  ];

  return (
    <Box width="100%">
      <Box padding={5}>
        <DataTable cols={cols} rows={teacher} uniqueKey="email" />
      </Box>
    </Box>
  )
}

export default Applications

interface props {
  params: GridRenderCellParams,
  URL: string,
  teacher: {
    teacher: Array<any>,
    setTeacher: React.Dispatch<React.SetStateAction<Array<never>>>
  }
}


const ApproveButton: React.FC<props> = ({ params, URL, teacher }) => {
  const handleBlock = (email: string) => {
    console.log(email)
    console.log(teacher)
    axios.patch(URL, { email: email }).then(() => {
      //@ts-ignore
      teacher.setTeacher([...teacher.teacher.filter(x => x.email != email)])
    })
  }
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        handleBlock(params.row.email)
      }}
      color="info"
    >
      Approve
    </Button>
  )
}