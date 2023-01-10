import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from './axios';
import React, { useEffect, useState } from 'react'
import BlockButton from './Components/BlockButton';
import { Box } from '@mui/system';
import DataTable from '../../Components/DataTable';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import moment from 'moment';

const nextYear = moment(new Date).add(1, 'year').year()

const date = moment(new Date)

const daysRemaining = moment(nextYear + "0101", "YYYYMMDD").diff(date, 'days')


const Allotment = () => {
  const [college, setCollege] = useState([]);

  useEffect(() => {
    axios
      .get('/university/allotment/all')
      .then((res) => {
        console.log(res.data)
        setCollege(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cols: GridColDef[] = [
    // { field: '_id', headerName: 'Id', flex: 10 },
    { field: 'name', headerName: 'Name', flex: 10 },
    { field: 'contact', headerName: 'Contact', flex: 10 },
    { field: 'gender', headerName: 'Gender', flex: 10 },
    { field: 'totalMark', headerName: 'Mark', flex: 8 },
    {
      field: 'markListLink', headerName: 'Attatchments', flex: 8, renderCell: (params: GridRenderCellParams) => (
        // <BlockButton params={params} keyId="_id" URL="/college/approval/invert" text={["Block", "Approve"]} />
        <Button variant='outlined' size='small' onClick={() => window.open(params.row.markListLink, "_blank")} >Attatchment</Button>
      ),
    },
    {
      field: 'isBlocked', headerName: 'Actions', flex: 8, renderCell: (params: GridRenderCellParams) => (
        <BlockButton params={params} keyId="_id" URL="/university/allotment/approval/invert" text={["Approve", "Block"]} />
      ),
    },
  ];

  const handleAllotment = () => {
    axios.post("/university/allotment").then(() => {
      toast.info("Allotment Completed")
    })
  }

  return (
    <Box width="100%">
      <Box padding={5}>
        <div className='flex flex-row-reverse my-2'>
          <Button disabled variant='outlined' onClick={() => handleAllotment()}>Allotment in : {daysRemaining}days</Button>
        </div>
        <DataTable rows={college} cols={cols} uniqueKey="_id" />
      </Box>
    </Box>
  );
}

export default Allotment