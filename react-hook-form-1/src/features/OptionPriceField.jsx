import React from 'react';
import InputWithFormFeedback from "./InputWithFormFeedback";
import useOptionField from "../model/useOptionField";

function OptionPriceField({ index }) {
    const { field: optionPriceField, fieldState: optionPriceError } = useOptionField( `options[${index}].optionPrice`, { required: 'Option price is required' });

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