import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface StudentDetailsState {
  name: string,
  email: string,
  id : string,
  classId: string
}

export interface StudentState {
  value: number
  details: StudentDetailsState
}

// interface value {
//   user : {
//     name : string,
//     email : string,
//     classId : string
//   } | null,
//   setUser : Function
// }

const initialState: StudentState = {
  value: 0,
  details : {
    name : "",
    email : "",
    classId : "",
    id : "",
  }
}

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<StudentDetailsState>) => {
      state.details = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDetails } = studentSlice.actions

export default studentSlice.reducer