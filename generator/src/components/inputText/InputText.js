import React, {useEffect, useState} from "react";

import "./InputText.scss"

export const InputText = ({name, value, setValue, text, setErrorInput, errors}) => {
    const [error, setError] = useState([]);
    const [data, setData] = useState('');

    useEffect(() => {
        setData(value);
    }, [value]);



    const activateField = (e) => {
        e.target.placeholder = '';
        errors.general = '';
    };

    const disableFocus = (e) => {
        setValue(data);
        e.target.placeholder = text;
    };

    const updateInputValue = (e) => {
        activateField(e);
        const { name, value } = e.target;
        let error;
        switch (name) {
            case 'firstName':
                error =
                    value.length < 1
                        ? 'Name must be at least 1 characters long!'
                        : '';
                setErrorInput({...errors, firstName: error});
                break;
            case 'lastName':
                error =
                    value.length < 1
                        ? 'Surname must be at least 1 characters long!'
                        : '';
                setErrorInput({...errors, lastName: error});
                break;
            case 'age':
                error =
                    +value < 16
                        ? 'Age must be more!'
                        : '';
                setErrorInput({...errors, age: error});
                break;
            case 'city':
                error =
                    value.length < 1
                        ? 'City must be at least 1 characters long!'
                        : '';
                setErrorInput({...errors, city: error});
                break;
            default:
                break;
        }
        setError(error);
        setData(value);
    };

    return (
        <>
            <input className="inputText"
                   type='text'
                   name={name}
                   value={data}
                   placeholder={text}
                   onFocus={(e) => activateField(e)}
                   onBlur={(e) => disableFocus(e)}
                   onChange={(e) => updateInputValue(e)}
            />
            {
                error.length > 0 && <span className='error'>{error}</span>
            }
        </>
    );
};


