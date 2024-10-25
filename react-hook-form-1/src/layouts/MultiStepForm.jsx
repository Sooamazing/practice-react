import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import OneStep from './OneStep';
import TwoStep from './TwoStep';

function MultiStepForm() {
    const methods = useForm();
    const [step, setStep] = useState(1);

    const onSubmit = (data) => {
        console.log('Final data:', data);
    };

    const handleNextStep = async () => {
        const isStepValid = await methods.trigger();
        if (isStepValid) {
            setStep(step + 1);
        }
    };
    const steps = [<OneStep key="one" />, <TwoStep key="two" />];

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {/* 첫 번째 - 가장 단순한 방식*/}
                {/*{step === 1 && <OneStep />}*/}
                {/*{step === 2 && <TwoStep />}*/}
                {/*두 번째 - JSX 컴포넌트 배열의 key값을 이용하는 방식 */}
                {/*{steps[step]}*/}
                <div>
                    {step < 2 && <button type="button" onClick={handleNextStep}>Next</button>}
                    {step === 2 && <button type="submit">Submit</button>}
                </div>
            </form>
        </FormProvider>
    );
}

export default MultiStepForm;