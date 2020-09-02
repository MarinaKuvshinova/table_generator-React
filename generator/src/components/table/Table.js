import React, {useEffect} from "react";
import "./Table.scss"
import {useTableData} from "../../context";

export const Table = ({setEditRow}) => {
    const {tableData, setTableData} = useTableData();

    useEffect(()=>{
        //console.log("tableData", tableData);
    }, [tableData]);

    const handleDeleteRow = (idTable, id) => {
        const elIndex = tableData.findIndex(el => el.idTable === idTable );
        let newArray = [...tableData];
        newArray[elIndex] = {...newArray[elIndex], data: newArray[elIndex].data.filter(el => el.id !== id)};
        setTableData([...newArray]);
    };

    const handleDeleteTable = (idTable) => {
        const newArray = [...tableData.filter(e => e.idTable !== idTable)];
        setTableData([...newArray]);
    };

    const handleCopyTable = (idTable) => {
        const newArray = [...tableData];
        let dataArray = [];
        const elIndex = tableData.findIndex(el => el.idTable === idTable );
        const copyTable = Object.assign({}, newArray[elIndex]);
        dataArray = [...copyTable.data];
        copyTable.idTable = Date.now();
        copyTable.delete = true;
        copyTable.data = dataArray;
        newArray.splice(elIndex+1, 0, copyTable);
        setTableData([...newArray]);
    };

    const handleEditRow = (idTable, id) => {
        let newArray = [...tableData];
        const elIndex = tableData.findIndex(el => el.idTable === idTable );
        let data = newArray[elIndex].data.filter(el => el.id === id);
        setEditRow({data:[...data][0], idTable});
    };

    return (
            tableData.length > 0 && tableData.map( table => (
                <div key={table.idTable} className="table">
                    <div className="table__buttons">
                        <button onClick={() => handleCopyTable(table.idTable)} className="button button-copy">Copy table</button>
                        {table.delete && <button onClick={() => handleDeleteTable(table.idTable)} className="btnIcoDelete table__delete">delete</button>}
                    </div>
                    <div className="table__header">
                        <span className="table__col">Name</span>
                        <span className="table__col">Surname</span>
                        <span className="table__col">Age</span>
                        <span className="table__col">City</span>
                        <span className="table__col">&nbsp;</span>
                    </div>
                    <div className="table__body">
                        {table.data.map((el) => (
                            <div key={el.id} className="table__body__row">
                                <span className="table__col table__body__row__col"><span className="table__col__title">Name: </span>{el.firstName}</span>
                                <span className="table__col table__body__row__col"><span className="table__col__title">Surname: </span>{el.lastName}</span>
                                <span className="table__col table__body__row__col"><span className="table__col__title">Age: </span>{el.age}</span>
                                <span className="table__col table__body__row__col"><span className="table__col__title">City: </span>{el.city}</span>
                                <span className="table__col table__body__row__col">
                                    <button onClick={() => handleEditRow(table.idTable, el.id)} className="link link-edit">Edit</button>
                                    <button onClick={() => handleDeleteRow(table.idTable, el.id)} className="link link-delete">Delete</button>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))
    );
};