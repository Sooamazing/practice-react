import React from 'react';
import {useController, useFormContext} from "react-hook-form";

function InputControllerInside({type, placeholder}) {
    const {control,getValues, formState: { errors } } = useFormContext();

    const { field: endMonth } = useController({
        name: 'education.end.month',
        control,
        rules: {
            validate: (value) => {
                const startYear = getValues('education.start.year');
                const startMonth = getValues('education.start.month');
                const endYear = getValues('education.end.year');
                if (value || startYear || startMonth || endYear) {
                    if (!value) return 'End month is required';
                    const startDate = new Date(startYear, startMonth - 1);
                    const endDate = new Date(endYear, value - 1);
                    return endDate > startDate || 'End date must be after start date';
                }
                return true;
            }
        }
    });

    return (<div>
        feature에서 controller, errorMessage, input 정의 -----
        <br/>
        <input type={type} {...endMonth} placeholder={placeholder}/>
        <br/>
        {errors?.education?.end?.month && <span>
                {errors.education.end.month.message}
            </span>}
    </div>);
}

export default InputControllerInside;