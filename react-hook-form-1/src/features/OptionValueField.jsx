import React from 'react';
import InputWithFormFeedback from "./InputWithFormFeedback";
import useOptionField from "../model/useOptionField";

function OptionValueField({ control, index }) {
    const { field: optionValueField, fieldState: optionValueError } = useOptionField(control, `options[${index}].optionValue`, { required: 'Option value is required' });

    return (
        <InputWithFormFeedback
            type="text"
            field={optionValueField}
            placeholder="Option Value"
            errors={optionValueError.error}
        />
    );
}

export default OptionValueField;