import React from 'react';

function InputWithFormFeedback({type, placeholder, errors, field}) {
    return (<div>
        layout에서 controller 정의, feature에서 input, errorMessage 정의 -----
        <br/>
        <input type={type} {...field} placeholder={placeholder}/>
        <br/>
        {errors?.education?.end?.year && <span>
                {errors.education.end.year.message}
            </span>}
    </div>);
}

export default InputWithFormFeedback;