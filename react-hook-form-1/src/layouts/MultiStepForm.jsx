import React from 'react';
import {useForm, FormProvider} from "react-hook-form";
import {StepProvider, useStep} from '../contexts/StepContext';
import StepIndicator from './StepIndicator';
import OneStep from "./OneStep";
import TwoStep from "./TwoStep";
import FourStep from "./FourStep";
import ThreeStep from "./ThreeStep";
import FiveStep from "./FiveStep";
import SixStep from "./SixStep";
import LastStep from "./LastStep";

function MultiStepForm() {
    const methods = useForm({shouldUnregister: false});
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

    // 기존 로직
    // const handleNextStep = async () => {
    //     const isStepValid = await methods.trigger();
    //     if (isStepValid) {
    //         nextStep();
    //     }
    // };

    // date trim 로직 추가
    const trimValues = (data) => {
        const trimmedData = {};
        for (const key in data) {
            if (typeof data[key] === 'string') {
                trimmedData[key] = data[key].trim();
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
        console.log('trimmedValues:', trimmedValues);
        methods.reset(trimmedValues);
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