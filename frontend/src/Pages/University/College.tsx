import { useEffect, useState } from 'react';
import Sidebar, { Tab } from '../../Components/Sidebar';
import { Dashboard, School } from '@mui/icons-material';
import styled from 'styled-components';
import DataTable from '../../Components/DataTable';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from './axios';


export default function College() {
  const tab: Array<Tab> = [
    {
      name: "Dashboard",
      linkTo: "/university",
      icon: <Dashboard />
    },
    {
      name: "College",
      linkTo: "/university/college",
      icon: <School />
    }
  ]
  const [active, setActive] = useState("");

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const [college, setCollege] = useState([]);

  useEffect(() => {
    axios.get("/university/college/all").then(res => {
      setCollege(res.data)
    }).catch(err => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    console.log(college)
  }, [college])

  const cols: GridColDef[] = [
    { field: 'collegeId', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  


  return (
    <Container>
      <Sidebar title='Tempe University' tab={tab} active={{ active, setActive }} />
        <DataTable rows={college} cols={cols} uniqueKey="collegeId"/>
    </Container>
  );
}

const Container = styled.div`
width : 100vw;
height : 100vh;
display : grid;
grid-template-columns : calc(200px + 5vw) calc(95vw - 200px);
`