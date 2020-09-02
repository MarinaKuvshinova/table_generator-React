import React, {useEffect, useState} from "react";
import {InputText} from "../inputText/InputText"

import "./Form.scss"
import {useTableData} from "../../context";


export const Form = ({editRow, setEditRow}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [errors, setErrors] = useState({firstName: false, lastName: false, age: false, city: false});
    const [valid, setValid] = useState(false);
    const {tableData, setTableData} = useTableData();

    useEffect(() => {
        if((errors.firstName==='' && errors.lastName==='' && errors.age==='' && errors.city==='')) {
            setValid(true);
        }
        if (editRow) {
            setFirstName(editRow.data.firstName);
            setLastName(editRow.data.lastName);
            setAge(editRow.data.age);
            setCity(editRow.data.city);
            setValid(true);
        }

    }, [errors, editRow]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editRow) {
            if (tableData.length < 1) {
                let tables = [{ idTable: Date.now(), delete:false, data: []}];
                const newRow = {id: Date.now(), firstName, lastName, age, city};
                tables[0].data.push(newRow);
                setTableData([...tables]);
            } else {
                const newRow = {id: Date.now(), firstName, lastName, age, city};
                let newArray = [...tableData];
                let dataArray = [...newArray[0].data];
                dataArray.push(newRow);
               newArray[0].data = dataArray;
               setTableData([...newArray]);
            }
        } else {
            let newArray = [...tableData];
            const elParent = tableData.findIndex(el => el.idTable === editRow.idTable);
            const elIndex = newArray[elParent].data.findIndex(e => e.id === editRow.data.id);
            newArray[elParent].data[elIndex] = {id: editRow.data.id, firstName, lastName, age, city};
            setTableData([...newArray]);
            setEditRow('');
        }
        setFirstName('');
        setLastName('');
        setAge('');
        setCity('');
    };

    return (
        <form onSubmit = {handleSubmit} className="form">
            <div className="form__row">
                <InputText name='firstName' value={firstName} setValue={setFirstName} text='Name' setErrorInput={setErrors} errors={errors} />
            </div>
            <div className="form__row">
                <InputText name='lastName' value={lastName} setValue={setLastName} text='Surname' setErrorInput={setErrors} errors={errors} />
            </div>
            <div className="form__row">
                <InputText name='age' value={age} setValue={setAge} text='Age' setErrorInput={setErrors} errors={errors} />
            </div>
            <div className="form__row">
                <InputText name='city' value={city} setValue={setCity} text='City' setErrorInput={setErrors} errors={errors} />
            </div>
            <button className="button form__button" disabled={ !valid ? 'disabled' : undefined}  type="submit"> {editRow ? 'EDIT' : 'ADD'}</button>
        </form>
    );
};