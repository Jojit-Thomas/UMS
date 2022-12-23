import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DataTable from '../../Components/DataTable';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import axios from './axios';
import { Box } from '@mui/material';
import BlockButton from './Components/BlockButton';

const College = () => {

  const [college, setCollege] = useState([]);

  useEffect(() => {
    axios
      .get('/university/college/all')
      .then((res) => {
        console.log(res.data)
        setCollege(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cols: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 10 },
    { field: 'email', headerName: 'Email', flex: 10 },
    { field: 'collegeId', headerName: 'College ID', flex: 8 },
    { field: 'place', headerName: 'Place', flex: 8 },
    {
      field: 'isApproved', headerName: 'Is Approved', flex: 8, renderCell: (params: GridRenderCellParams) => (
        <BlockButton params={params} keyId="collegeId" URL="/college/approval/invert" text={["Block", "Approve"]} />
      ),
    },
  ];

  return (
    <Box width="100%">
      <Box padding={5}>
        <DataTable rows={college} cols={cols} uniqueKey="collegeId" />
      </Box>
    </Box>
  );
}

export default College