import React, { createContext, useState, useEffect, useContext } from 'react';

interface TableContextValue {
  tableContext: any; 
  setTableContext: React.Dispatch<React.SetStateAction<{}>>;
}

const defaultValue: TableContextValue = {
  tableContext: {
    default: 'defaultText'
  },
  setTableContext: () => {} 
};

const TableDataContext = createContext<TableContextValue>(defaultValue);

const useTableContext = () => {
  return useContext(TableDataContext)
}

const TableContext = ({ children }) => {

  const defaultContext = {
    default: 'defaultText'
  }
  
  const [tableContext, setTableContext] = useState(defaultContext);

  const [dataContextsLoaded, setDataContextsLoaded] = useState(true);

  // useEffect(()=>{
  //   const isEmptyObj = (obj) => {
  //     return Object.keys(obj).length === 0;
  //   };
  
  //   const isEmptyArr = (Arr) => {
  //       return Arr.length === 0;
  //   };

  //   setDataContextsLoaded(!isEmptyObj(tableContext))
  // }, [tableContext])

  return (
    <TableDataContext.Provider value={{ tableContext, setTableContext }}>
        {dataContextsLoaded && children}
    </TableDataContext.Provider>
  );
};

export { TableContext, TableDataContext, useTableContext };