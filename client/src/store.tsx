import React, { createContext, useState } from "react";

interface value {
  user : String,
  setUser : Function
}

export const UserContext = createContext<value | null>(null);

export function Context ({children}: {children : React.ReactNode}) {
  const [user, setUser] = useState("");
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

