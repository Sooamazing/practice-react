import React from 'react';
import {useController, useFormContext, useWatch} from "react-hook-form";

function SixStep() {
    const {control, clearErrors, trigger} = useFormContext();
    const {field: hobby, fieldState: {error: hobbyError}} = useController({name: 'a.b.hobby', control});
    const hobbyValue = useWatch({control, name: 'a.b.hobby'});

    // 조건부 required 규칙
    const commonRequiredRule = { required: hobbyValue ? 'This field is required' : false };

    const {field: favoriteHobby, fieldState: {error: favoriteHobbyError}} = useController({
        name: 'a.b.favoriteHobby', control, rules: commonRequiredRule,
    });
    const {field: startTime, fieldState: {error: startTimeError}} = useController({
        name: 'a.b.startTime', control, rules: commonRequiredRule,
    });
    const {field: endTime, fieldState: {error: endTimeError}} = useController({
        name: 'a.b.endTime', control, rules: commonRequiredRule,
    });

    const {field: color, fieldState: {error: colorError}} = useController({name: 'a.b.color', control});

    const handleInputChange = (name) => {
        clearErrors(name);
    };

    const handleHobbyChange = (e) => {
        hobby.onChange(e);

        // hobby 값에 따라 필수 상태 트리거
        // Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop. -> onChange에만 검증
        // TODO 좀 더 상세히 알아 보기
        if (e.target.value) {
            trigger(['a.b.favoriteHobby', 'a.b.startTime', 'a.b.endTime']);
        } else {
            clearErrors(['a.b.favoriteHobby', 'a.b.startTime', 'a.b.endTime']);
        }
    };

    return (
        <div>
            <h1>Six step</h1>
            <input {...hobby} placeholder="Hobby" onChange={handleHobbyChange}/>
            {hobbyError && <span>hobbyError: {hobbyError.message}</span>}
            <br/>

            <input {...favoriteHobby} placeholder="Favorite Hobby" onChange={() => handleInputChange('a.b.favoriteHobby')}/>
            {favoriteHobbyError && <span>favoriteHobby: {favoriteHobbyError.message}</span>}
            <br/>

            <input {...startTime} placeholder="Start Time" onChange={() => handleInputChange('a.b.startTime')}/>
            {startTimeError && <span>startTime: {startTimeError.message}</span>}
            <br/>

            <input {...endTime} placeholder="End Time" onChange={() => handleInputChange('a.b.endTime')}/>
            {endTimeError && <span>endTime: {endTimeError.message}</span>}
            <br/>

            <input {...color} placeholder="Color"/>
            {colorError && <span>color: {colorError.message}</span>}
        </div>
    );
}

export default SixStep;