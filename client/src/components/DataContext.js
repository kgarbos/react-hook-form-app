import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  //Initialize state
  const [data, setData] = useState({});

  const setValues = (values) => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  };

  return (
    //Return ContextProvider, pass the children props variable as its own children.
    <DataContext.Provider value={{ data, setValues }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => useContext(DataContext);
//Export both the DataContext and the Context Provider Itself.