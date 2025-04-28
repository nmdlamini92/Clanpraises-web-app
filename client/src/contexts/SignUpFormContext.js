import React, { createContext, useState } from 'react';

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState({username:"", email:"",password:""});

  return (
    <MyContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </MyContext.Provider>
  );
};