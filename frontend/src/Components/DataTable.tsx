import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styled from 'styled-components';


export default function DataTable({rows, cols, uniqueKey}: {rows : Array<Object>, cols : GridColDef[], uniqueKey : string}) {
  return (
    <Container>
      <Box sx={{ height: 400, width: '100%' }} >
        <DataGrid
          rows={rows}
          columns={cols}
          getRowId={(e => e[uniqueKey])}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
}

const Container = styled.div`
width : 100%;
height : 100%;
display : grid;
`