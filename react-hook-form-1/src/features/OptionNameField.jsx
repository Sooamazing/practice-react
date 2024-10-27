import React from 'react';
import InputWithFormFeedback from "./InputWithFormFeedback";
import useOptionField from "../model/useOptionField";

function OptionNameField({ control, index }) {
    const { field: optionNameField, fieldState: optionNameError } = useOptionField(control, `options[${index}].optionName`, { required: 'Option name is required' });

    return (
        <InputWithFormFeedback
            type="text"
            field={optionNameField}
            placeholder="Option Name"
            errors={optionNameError.error}
        />
    );
}

export default OptionNameField;