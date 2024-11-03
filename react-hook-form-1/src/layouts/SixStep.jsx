import React from 'react';
import { useController, useFormContext, useWatch } from "react-hook-form";

/**
 * 특정 필드에 입력이 있을 때 다른 필드가 required 속성을 가짐
 * @returns {Element}
 * @constructor
 */
function SixStep() {
    const { control } = useFormContext();
    const { field: hobby, fieldState:{error:hobbyError} } = useController({ name: 'a.b.hobby', control });
    const hobbyValue = useWatch({ control, name: 'a.b.hobby' });

    const { field: favoriteHobby, fieldState:{error:favoriteHobbyError} } = useController({
        name: 'a.b.favoriteHobby',
        control,
        rules: { required: !!hobbyValue }
    });
    const { field: startTime, fieldState:{error:startTimeError} } = useController({
        name: 'a.b.startTime',
        control,
        rules: { required: !!hobbyValue }
    });
    const { field: endTime,fieldState:{error:endTimeError} } = useController({
        name: 'a.b.endTime',
        control,
        rules: { required: !!hobbyValue }
    });
    const { field: color,fieldState:{error:colorError} } = useController({ name: 'a.b.color', control });

    return (
        <div>
            <h1>Six step</h1>
            <input {...hobby} placeholder="Hobby"/>
            {hobbyError && <span>hobbyError: {hobbyError.message}</span>}
            <br/>
            <input {...favoriteHobby} placeholder="Favorite Hobby"/>
            {favoriteHobbyError && <span>favoriteHobby: {favoriteHobbyError.message}</span>}
            <br/>
            <input {...startTime} placeholder="Start Time"/>
            {startTimeError && <span>startTime: {startTimeError.message}</span>}
            <br/>
            <input {...endTime} placeholder="End Time"/>
            {endTimeError && <span>endTime: {endTimeError.message}</span>}
            <br/>
            <input {...color} placeholder="Color"/>
            {colorError && <span>color: {colorError.message}</span>}
        </div>
    );
}

export default SixStep;