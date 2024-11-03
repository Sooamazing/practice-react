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
    // 이게 있어야 hobby가 사라지면 favoriteHobby, startTime도 초기화됨
    // 없어도 Required는 초기화됨.
    // React.useMemo(() => {
    //     if (!hobbyValue) {
    //         clearErrors(['a.b.favoriteHobby', 'a.b.startTime']);
    //     }
    // }, [hobbyValue]);

    // onChange 핸들러를 통해 직접적인 입력 반응을 처리하는 것이 사용자 경험을 개선하는 데 더 효과적입니다. 하지만 상태 변화에 따라 특정 동작을 자동으로 실행해야 하는 경우에는 useMemo가 더 적합할 수 있습니다. 최종적으로 어떤 방법을 사용할지는 특정 컴포넌트의 요구 사항과 성능 고려 사항에 따라 결정해야 합니다.

    // 상기 memo 대신 하기 onChange, clearError로 구현, hobby 필드의 onChange를 커스터마이징
    const handleHobbyChange = (e) => {
        // hobby 값을 설정
        hobby.onChange(e);

        // hobby가 비어 있으면 favoriteHobby와 startTime 초기화 및 에러 제거
        if (!e.target.value) {
            clearErrors(['a.b.favoriteHobby', 'a.b.startTime']);
        }
    };

    // hobby 필드의 onChange에 커스터마이징 함수 할당
    const newHobby = { ...hobby, onChange: handleHobbyChange };


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
            <input {...newHobby} placeholder="Hobby" />
            {hobbyError && <span>hobbyError: {hobbyError.message}</span>}
            <br />
            {favoriteHobbyRules.required.value&&"required"}
            <input {...newFavoriteHobby} placeholder="Favorite Hobby" s />
            {favoriteHobbyError && <span>favoriteHobby: {favoriteHobbyError.message}</span>}
            <br />

            {startTimeRules.required.value&&"required"}
            <input {...startTime} placeholder="Start Time"  />
            {startTimeError && <span>startTime: {startTimeError.message}</span>}
            <br />

            <input {...color} placeholder="Color" />
            {colorError && <span>color: {colorError.message}</span>}
        </div>
    );
}

export default SixStep;