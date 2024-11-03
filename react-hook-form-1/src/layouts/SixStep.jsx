import React from 'react';
import { useController, useFormContext, useWatch } from "react-hook-form";

/**
 * 특정 필드에 입력이 있을 때 다른 필드가 required 속성을 가짐
 * @returns {Element}
 * @constructor
 */
function SixStep() {
    const { control, trigger, clearErrors } = useFormContext();
    const { field: hobby, fieldState: { error: hobbyError } } = useController({ name: 'a.b.hobby', control });
    const hobbyValue = useWatch({ control, name: 'a.b.hobby' });

    // hobby에 영향 받음
    const favoriteHobbyRules = {
        required: {
            value: !!hobbyValue, message: 'Favorite Hobby is required'
        }
    };
    const { field: favoriteHobby, fieldState: { error: favoriteHobbyError } } = useController({
        name: 'a.b.favoriteHobby',
        control,
        rules: favoriteHobbyRules,
    });

    const startTimeRules = {
        required: {
            value: !!hobbyValue, message: 'Start Time is required'
        }
    };
    const { field: startTime, fieldState: { error: startTimeError } } = useController({
        name: 'a.b.startTime',
        control,
        rules: startTimeRules
    });

    // Hobby에 영향 받지 않음.
    const { field: color, fieldState: { error: colorError } } = useController({ name: 'a.b.color', control });

    // hobby 값이 사라지면 다른 필드의 값도 초기화
    // React.useMemo(() => {
    //     if (!hobbyValue) {
    //         clearErrors(['a.b.favoriteHobby', 'a.b.startTime']);
    //     }
    // }, [hobbyValue]);

    // 다른 필드에 입력이 생기면 에러 제거 및 실시간 검증
    const handleInputChange = (name, onChange) => async (e) => {
        clearErrors(name);
        onChange(e);
        await trigger(name);
    };
    const newFavoriteHobby = {...favoriteHobby, onChange: handleInputChange('a.b.favoriteHobby', favoriteHobby.onChange)};

    console.log('hobbyValue:', hobbyValue, 'favoriteHobby error', favoriteHobbyError, 'startTime error:', startTimeError);

    return (
        <div>
            <h1>Six step</h1>
            <input {...hobby} placeholder="Hobby" />
            {hobbyError && <span>hobbyError: {hobbyError.message}</span>}
            <br />
            <input {...newFavoriteHobby} placeholder="Favorite Hobby" s />
            {favoriteHobbyError && <span>favoriteHobby: {favoriteHobbyError.message}</span>}
            <br />
            <input {...startTime} placeholder="Start Time"  />
            {startTimeError && <span>startTime: {startTimeError.message}</span>}
            <br />

            <input {...color} placeholder="Color" />
            {colorError && <span>color: {colorError.message}</span>}
        </div>
    );
}

export default SixStep;