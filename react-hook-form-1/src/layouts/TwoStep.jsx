import React,{useState} from 'react';
import { useFormContext,useController } from "react-hook-form";

/**
    phone 숫자만 입력 허용, - 자동 입력
    TODO useState 사용하지 않는 방법
    TODO 다른 문자가 들어오는 경우 잠깐 보였다가 사라지게 하는 방법
 */
function TwoStep() {
    const { handleSubmit, control, formState: { errors } } = useFormContext();
    const { field: name } = useController({ name: 'basic.name', control, rules: { required: 'Name is required' } });
    const { field: email } = useController({ name: 'basic.email', control, rules: { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } } });
    const { field: phone } = useController({ name: 'basic.phone', control });

    const onSubmit = (data) => {
        console.log('TwoStep data:', data);
    }

    const [formattedPhone, setFormattedPhone] = useState(phone.value);

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedValue = numericValue;

        if (numericValue.length > 3 && numericValue.length <= 7) {
            formattedValue = numericValue.replace(/(\d{3})(\d+)/, '$1-$2');
        } else if (numericValue.length > 7) {
            formattedValue = numericValue.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
        }

        setFormattedPhone(formattedValue);
        phone.onChange(numericValue); // Update the form value with the unformatted numeric value
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
                이름: <input type="text" {...name} placeholder="Name" /><br />
                {errors.basic?.name && <span>{errors.basic.name.message}</span>}
            </div>
            <div>
                이메일: <input type="text" {...email} placeholder="Email" /><br />
                {errors.basic?.email && <span>{errors.basic.email.message}</span>}
            </div>
            <div>
                전화번호: <input type="text" {...phone} placeholder="Phone" onChange={handlePhoneChange} value={formattedPhone}/><br />
                {errors.basic?.phone && <span>{errors.basic.phone.message}</span>}
            </div>
            <button type="submit">2nd Submit</button>
        </form>
    );
}

export default TwoStep;