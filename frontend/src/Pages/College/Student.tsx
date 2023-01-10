import React, { useEffect, useState } from 'react'
import DataTable from '../../Components/DataTable'
import axios from './axios';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Student = () => {
  const [teacher, setTeacher] = useState([]);
  useEffect(() => {
    axios.get("/college/student/all").then((res) => {
      console.log(res.data)
      setTeacher(res.data)
    })
  }, [])
  const navigate = useNavigate();

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 10, minWidth: 100 },
    // { field: 'collegeId', headerName: 'College ID', flex: 8, minWidth: 100 },
    { field: 'course', headerName: 'Course', flex: 8, minWidth: 100 },
    { field: 'gender', headerName: 'Gender', flex: 8, minWidth: 100 },
    { field: 'address', headerName: 'Address', flex: 8, minWidth: 100 },
    { field: 'classId', headerName: 'Class ID', flex: 3, minWidth: 100 },
    { field: 'contact', headerName: 'Contact', flex: 10, minWidth: 100 },
    { field: 'email', headerName: 'Email', flex: 15, minWidth: 100 },
    {
      field: 'isBlocked', headerName: 'Actions', flex: 8, minWidth: 80 , renderCell: (params: GridRenderCellParams) => (
        <BlockButton params={params} URL="/college/student/block" keyId='email' text={["Unblock", "Block"]} />
      ),
    },
    {
      field: '', headerName: 'Actions', flex: 12, minWidth: 150 , renderCell: (params: GridRenderCellParams) => (
        <Button variant='outlined' onClick={() => navigate(`/college/student/${params.row.email}`)} >Detailed View</Button>
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

export default Student


const BlockButton = <T extends string[]>({ ...props }: {
  params: GridRenderCellParams,
  keyId: string,
  URL: string,
  text: T & { 0: string, 1: string }
}) => {
  const { params, keyId, URL, text } = props
  const [isBlocked, setisBlocked] = useState<boolean>(params.value);
  const handleBlock = (params: string) => {
    axios.patch(URL, { [keyId]: params }).then(() => {
      setisBlocked(prev => !prev)
    })
  }
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        handleBlock(params.row[keyId])
      }}
      color={isBlocked ? "error" : "info"}
    >
      {isBlocked ? text[0] : [text[1]]}
    </Button>
  )
}
