import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';
import axios from '../axios';
import { useState } from 'react'

//@params : text 
// text [true, false]

function BlockButton<T extends string[]>({ params, keyId, URL, text }: { params: GridRenderCellParams, keyId: string, URL: string, text: T & { 0: string, 1: string } }) {
  const [isApproved, setIsApproved] = useState<boolean>(params.value);
  const handleBlock = (collegeId: string) => {
    axios.patch(URL, { [keyId] : collegeId }).then(() => {
      setIsApproved(prev => !prev)
    })
  }
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => {
        handleBlock(params.row[keyId])
      }}
      color={isApproved ? "error" : "info"}
    >
      {isApproved ? text[0] : [text[1]]}
    </Button>
  )
}

export default BlockButton
