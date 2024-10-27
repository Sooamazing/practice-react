import React from 'react';
import {Button} from "reactstrap";
import {useFormContext, useFieldArray} from "react-hook-form";
import OptionItem from "../features/OptionItem";

/**
 * useFieldArray 이용 사용 옵션값 추가 및 삭제
 * 맨 처음에 옵션 필드 1개 추가된 상태로 렌더링 -> UseEffect / length, button show 중 후자 택.
 * 참고: https://techblog.pet-friends.co.kr/react-hook-form-으로-폼-form-화면을-개선해요-e428b78539c0
 */
function ThreeStep() {
    const {control} = useFormContext();
    const {fields: productOptions, append, remove} = useFieldArray({
        name: 'options',
        control,
        defaultValues: [{optionName: '', optionValue: '', optionPrice: ''}]
    });

    // 처음 렌더링 시 기본 옵션 필드 추가
    if (productOptions.length === 0) {
        append({
            optionName: '',
            optionValue: '',
            optionPrice: ''
        });
    }

    const onClickAddOption = () => {
        // default value 추가하지 않으면 [object Object]로 출력됨
        append({
            optionName: '',
            optionValue: '',
            optionPrice: ''
        });
    };

    const onClickRemoveOption = (idx) => {
        remove(idx);
    };

    return (
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            {productOptions.map((option, index) => (
                <OptionItem
                    key={option.id}
                    index={index}
                    onClickRemoveOption={() => onClickRemoveOption(index)}
                    showDeleteButton={productOptions.length > 1}

                />
            ))}
            <Button onClick={onClickAddOption}>옵션값 추가</Button>
        </div>
    );
}

export default ThreeStep;