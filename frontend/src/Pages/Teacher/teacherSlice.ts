import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Details {
  name: string,
  collegeId: string,
  email : string
  id : string
}

export interface StudentState {
  isNewClassModalOpen: boolean,
  details: Details
}

const initialState: StudentState = {
  isNewClassModalOpen: false,
  details: {
    name: "",
    collegeId: "",
    email : "",
    id : "",
  }
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    invertModalOpen: (state) => {
      state.isNewClassModalOpen = !state.isNewClassModalOpen;
    },
    setDetails: (state, action: PayloadAction<Details>) => {
      state.details = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { invertModalOpen, setDetails } = teacherSlice.actions

export default teacherSlice.reducer