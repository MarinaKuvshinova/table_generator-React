import React, {createContext, useContext, useState} from "react";

export const DataContext = createContext();
export const DataProvider = ({children}) => {
    const [tableData, setTableData] = useState([
        // {
        //     idTable:1,
        //     delete:false,
        //     data: [
        //         {id:1, firstName:'Marina1', lastName:'K', age: 18, city:'City'},
        //         {id:2, firstName:'Marina1', lastName:'K', age: 18, city:'City'},
        //         {id:3, firstName:'Marina1', lastName:'K', age: 18, city:'City'}
        //     ]
        // }, {
        //     idTable: 2,
        //     delete: true,
        //     data: [
        //         {id:1, firstName:'Marina2', lastName:'K', age: 18, city:'City'},
        //         {id:2, firstName:'Marina2', lastName:'K', age: 18, city:'City'},
        //         {id:3, firstName:'Marina2', lastName:'K', age: 18, city:'City'}
        //     ]
        // }
    ]);

    return (
        <DataContext.Provider value={{tableData, setTableData}}>
            {children}
        </DataContext.Provider>
    );
};

export const useTableData = () => useContext(DataContext);