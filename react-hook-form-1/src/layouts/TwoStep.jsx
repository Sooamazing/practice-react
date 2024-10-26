import React from 'react';
import { useFormContext,useForm, useController } from "react-hook-form";

/**
    TODO phone 숫자만 입력 허용, - 자동 입력
 */
function TwoStep() {
    const { handleSubmit, control, formState: { errors } } = useFormContext();
    const { field: name } = useController({ name: 'basic.name', control, rules: { required: 'Name is required' } });
    const { field: email } = useController({ name: 'basic.email', control, rules: { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } } });
    const { field: phone } = useController({ name: 'basic.phone', control });

    const onSubmit = (data) => {
        console.log('TwoStep data:', data);
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
                전화번호: <input type="text" {...phone} placeholder="Phone" /><br />
                {errors.basic?.phone && <span>{errors.basic.phone.message}</span>}
            </div>
            <button type="submit">2nd Submit</button>
        </form>
    );
}

export default TwoStep;