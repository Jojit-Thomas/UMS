// import React, { createContext, useState } from "react";

// interface value {
//   user : {
//     name : string,
//     email : string,
//     classId : string
//   } | null,
//   setUser : Function
// }

// //@ts-ignore
// export const userContext = createContext<value>(null);

// export function Context ({children}: {children : React.ReactNode}) {
//   const [user, setUser] = useState(null);
  
//   return (
//     <userContext.Provider value={{user, setUser}}>
//       {children}
//     </userContext.Provider>
//   )
// }



import { configureStore } from '@reduxjs/toolkit'

import studentReducer from '../Pages/Student/studentSlice'

import teacherReducer from '../Pages/Teacher/teacherSlice'

export const store = configureStore({
  reducer: {
    student : studentReducer,
    teacher : teacherReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch