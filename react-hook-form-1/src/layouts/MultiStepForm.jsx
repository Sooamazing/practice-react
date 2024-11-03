import React from 'react';
import {useForm, FormProvider} from "react-hook-form";
import {StepProvider, useStep} from '../contexts/StepContext';
import StepIndicator from './StepIndicator';
import OneStep from "./OneStep";
import TwoStep from "./TwoStep";
import ThreeStep from "./ThreeStep";
import FourStep from "./FourStep";
import FiveStep from "./FiveStep";
import SixStep from "./SixStep";
import LastStep from "./LastStep";

function MultiStepForm() {
    const methods = useForm({shouldUnregister: false, shouldValidate: true // validation on setValue
         });
    const {step, nextStep, prevStep} = useStep();

    const steps = [
        {component: <OneStep key="one"/>,},
        {component: <TwoStep key="two"/>},
        {component: <ThreeStep key="three"/>},
        {component: <FourStep key="four"/>},
        {component: <FiveStep key="five"/>},
        {component: <SixStep key="six"/>},
        {component: <LastStep key="last"/>},
    ];

    const onSubmit = (data) => {
        console.log('Final data:', data);
    };

    // date trim 로직 추가
    const trimValues = (data) => {
        const trimmedData = {};
        for (const key in data) {
            if (typeof data[key] === 'string') {
                const trimmedValue = data[key].trim();
                // '' 대신 undefined로 하면 '     '인 경우 TRIM되지 않은 값 그대로 남아 있음
                // trimmedData[key] = trimmedValue === '' ? undefined : trimmedValue;
                trimmedData[key] = trimmedValue === '' ? '' : trimmedValue;
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                trimmedData[key] = trimValues(data[key]);
            } else {
                trimmedData[key] = data[key];
            }
        }
        return trimmedData;
    };

    const handleNextStep = async () => {
        const values = methods.getValues();
        const trimmedValues = trimValues(values);

        // 메서드 나누지 않고 한 번에 setValue로 트림된 값을 적용하면서 유효성 검사 강제
        // Trim values and update fields individually to trigger validation
        // for (const key in values) {
        //     if (typeof values[key] === 'string') {
        //         const trimmedValue = values[key].trim();
        //         methods.setValue(key, trimmedValue === '' ? '' : trimmedValue, {
        //             shouldValidate: true, // Triggers validation for each update
        //         });
        //     }
        // }

        // 각 필드를 setValue로 설정하여 트림된 값을 적용
        for (const key in trimmedValues) {
            methods.setValue(key, trimmedValues[key], { shouldValidate: true }); // shouldValidate로 유효성 검사 강제
        }

        // reset을 사용하면 유효성 검사가 자동으로 트리거되지 않습니다. 이 점이 중요한데, reset은 필드 상태를 즉시 변경해 주기 때문에, React Hook Form은 이를 “사용자가 값을 변경한 것”으로 간주하지 않습니다. 그래서 유효성 검사를 바로 실행하지 않고, 새로운 상태로 필드들을 그대로 설정하게 됩니다.
        // methods.reset(trimmedValues);


        const isStepValid = await methods.trigger();
        if (isStepValid) {
            nextStep();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <StepIndicator/>
                {steps[step].component}
                <div>
                    {step > 0 && <button type="button" onClick={prevStep}>Previous</button>}
                    {step < steps.length - 1 && <button type="button" onClick={handleNextStep}>Next</button>}
                    {step === steps.length - 1 && <button type="submit">Submit</button>}
                </div>
            </form>
        </FormProvider>
    );
}

export default function App() {
    return (
        <StepProvider>
            <MultiStepForm/>
        </StepProvider>
    );
}