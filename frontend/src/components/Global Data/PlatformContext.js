import React, { createContext, useState } from "react";

const PlatformContext = createContext();

function PlatformProvider({ children }) {
   //Farm Information Screen Details
   const [userData, setUserData] = useState({});

   return (
      <PlatformContext.Provider value={{
         userData, setUserData
      }}>
         {children}
      </PlatformContext.Provider>
   );
}
export { PlatformContext, PlatformProvider };