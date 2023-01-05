import React, { createContext, useState } from "react";

interface value {
  user : {
    name : string,
    email : string,
    classId : string
  } | null,
  setUser : Function
}

//@ts-ignore
export const userContext = createContext<value>(null);

export function Context ({children}: {children : React.ReactNode}) {
  const [user, setUser] = useState(null);
  
  return (
    <userContext.Provider value={{user, setUser}}>
      {children}
    </userContext.Provider>
  )
}

