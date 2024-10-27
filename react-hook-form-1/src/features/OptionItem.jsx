import React from 'react';
import { Input, Button } from "reactstrap";
import { useController } from "react-hook-form";

/**
 * field 옵션 추가 및 삭제
 * TODO 입력 시 렌더링 같이 되는 문제 해결 필요
 */
function OptionItem({ control, index, onClickRemoveOption }) {
    const { field: optionNameField } = useController({
        name: `options[${index}].optionName`,
        control,
        rules: { required: 'Option name is required' }
    });

    const { field: optionValueField } = useController({
        name: `options[${index}].optionValue`,
        control,
        rules: { required: 'Option value is required' }
    });

    const { field: optionPriceField } = useController({
        name: `options[${index}].optionPrice`,
        control,
        rules: { required: 'Option price is required' }
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Button onClick={onClickRemoveOption}>삭제</Button>
            <Input type="text" {...optionNameField} placeholder="Option Name" />
            <Input type="text" {...optionValueField} placeholder="Option Value" />
            <Input type="text" {...optionPriceField} placeholder="Option Price" />
        </div>
    );
}

export default OptionItem;