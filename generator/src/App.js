import React, {useState} from 'react';
import './App.scss';
import {Form} from "./components/form/Form";
import {DataProvider} from "./context";
import {Table} from "./components/table/Table";

export const App = () => {
  const [editRow, setEditRow] = useState('');

  return (
      <DataProvider>
        <div className="page">
          <Form editRow = {editRow} setEditRow = {setEditRow}/>
          <Table setEditRow = {setEditRow}/>
        </div>
      </DataProvider>
  );
};

