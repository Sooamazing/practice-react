import React from 'react';

function ControlledInput({type, field, placeholder}) {
    return (<div>
        layout에서 controller, errorMessage 정의, feature에서 input 정의 -----
        <br/>
        <input type={type} {...field} placeholder={placeholder}/></div>);
}

export default ControlledInput;