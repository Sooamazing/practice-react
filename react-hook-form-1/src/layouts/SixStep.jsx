import React from 'react';
import {useController, useFormContext, useWatch} from "react-hook-form";

/**
 * 특정 필드에 입력이 있을 때 다른 필드가 required 속성을 가짐
 * @returns {Element}
 * @constructor
 */
function SixStep() {
    const {control, setValue, clearErrors} = useFormContext();
    const {field: hobby, fieldState: {error: hobbyError}} = useController({name: 'a.b.hobby', control});
    const hobbyValue = useWatch({control, name: 'a.b.hobby'});

    // hobby에 영향 받음
    const favoriteHobbyRules = {
        required: {
            value: !!hobbyValue, message: 'Favorite Hobby is required'
        }

    }
    const {field: favoriteHobby, fieldState: {error: favoriteHobbyError}} = useController({
        name: 'a.b.favoriteHobby',
        control,
        rules: {...favoriteHobbyRules},
    });

    const startTimeRules =
        {
            required: {
                value: !!hobbyValue, message: 'Start Time is required'
            }
        }

    const {field: startTime, fieldState: {error: startTimeError}} = useController({
        name: 'a.b.startTime',
        control,
        rules: {
            ...startTimeRules
        }
    });

    const endTimeRules = {
        required: {
            value: !!hobbyValue, message: 'End Time is required'
        }
    }
    const {field: endTime, fieldState: {error: endTimeError}} = useController({
        name: 'a.b.endTime',
        control,
        rules: {
            ...endTimeRules
        }
    });

    // Hobby에 영향 받지 않음.
    const {field: color, fieldState: {error: colorError}} = useController({name: 'a.b.color', control});


    // hobby 값이 사라지면 다른 필드 필수 에러 제거
    // TODO required 속성만 제거 필요
    if (!hobbyValue) {
        clearErrors(['a.b.favoriteHobby', 'a.b.startTime', 'a.b.endTime']);
    }

    // 다른 필드에 입력이 생기면 에러 제거
    // TODO 입력되지 않는 문제 해결 필요
    const handleInputChange = (name) => {
        clearErrors(name);
    };

    return (
        <div>
            <h1>Six step</h1>
            <input {...hobby} placeholder="Hobby"/>
            {hobbyError && <span>hobbyError: {hobbyError.message}</span>}
            <br/>

            {favoriteHobbyRules?.required && <span>favoriteHobbyRules: "required"</span>}
            <input {...favoriteHobby} placeholder="Favorite Hobby"
                   onChange={() => handleInputChange('a.b.favoriteHobby')}/>
            {favoriteHobbyError && <span>favoriteHobby: {favoriteHobbyError.message}</span>}
            <br/>
            {startTimeRules?.required && <span>startTimeRules: "required"</span>}
            <input {...startTime} placeholder="Start Time" onChange={() => handleInputChange('a.b.startTime')}/>
            {startTimeError && <span>startTime: {startTimeError.message}</span>}
            <br/>

            {endTimeRules?.required && <span>endTimeRules: "required"</span>}
            <input {...endTime} placeholder="End Time" onChange={() => handleInputChange('a.b.endTime')}/>
            {endTimeError && <span>endTime: {endTimeError.message}</span>}
            <br/>
            <input {...color} placeholder="Color"/>
            {colorError && <span>color: {colorError.message}</span>}
        </div>
    );
}

export default SixStep;