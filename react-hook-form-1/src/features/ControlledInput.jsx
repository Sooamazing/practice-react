import React from 'react';

function ControlledInput(type, field, placeholder) {
    return (<div>
        <input type={type} {...field} placeholder={placeholder}/></div>);
}

export default ControlledInput;