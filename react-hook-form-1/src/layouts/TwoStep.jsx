import React from 'react';
import {useFormContext, useController} from "react-hook-form";

/**
 phone 숫자만 입력 허용, - 자동 입력
 TODO 다른 문자가 들어오는 경우 잠깐 보였다가 사라지게 하는 방법
 */
function TwoStep() {
    const {handleSubmit, control, formState: {errors}} = useFormContext();

    const {field: name} = useController({name: 'basic.name', control, rules: {required: 'Name is required'}});
    const {field: email} = useController({
        name: 'basic.email',
        control,
        rules: {required: 'Email is required', pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'}}
    });
    const {field: phone} = useController({name: 'basic.phone', control});

    const onSubmit = (data) => {
        console.log('TwoStep data:', data);
    }

    const formatPhoneNumber = (value) => {
        if(!value) return ''; // Uncaught TypeError: Cannot read properties of undefined (reading 'replace')
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    };
    const handlePhoneChange = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        e.target.value = formattedValue;
        phone.onChange(formattedValue.replace(/\D/g, '')); // 숫자만 저장
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <div>
                이름: <input type="text" {...name} placeholder="Name"/><br/>
                {errors.basic?.name && <span>{errors.basic.name.message}</span>}
            </div>
            <div>
                이메일: <input type="text" {...email} placeholder="Email"/><br/>
                {errors.basic?.email && <span>{errors.basic.email.message}</span>}
            </div>
            <div>
                전화번호: <input
                type="text"
                {...phone}
                onChange={handlePhoneChange}
                value={formatPhoneNumber(phone.value)}
                placeholder="Phone"
            /><br/>
                {errors.basic?.phone && <span>{errors.basic.phone.message}</span>}
            </div>
            <button type="submit">2nd Submit</button>
        </form>
    );
}

export default TwoStep;