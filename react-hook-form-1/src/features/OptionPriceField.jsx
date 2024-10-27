import React from 'react';
import InputWithFormFeedback from "./InputWithFormFeedback";
import useOptionField from "../model/useOptionField";

function OptionPriceField({ control, index }) {
    const { field: optionPriceField, fieldState: optionPriceError } = useOptionField(control, `options[${index}].optionPrice`, { required: 'Option price is required' });

    return (
        <InputWithFormFeedback
            type="text"
            field={optionPriceField}
            placeholder="Option Price"
            errors={optionPriceError.error}
        />
    );
}

export default OptionPriceField;