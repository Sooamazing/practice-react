import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { StepProvider, useStep } from '../contexts/StepContext';
import StepIndicator from './StepIndicator';
import OneStep from "./OneStep";
import TwoStep from "./TwoStep";
import FourStep from "./FourStep";
import ThreeStep from "./ThreeStep";
import FiveStep from "./FiveStep";
import SixStep from "./SixStep";

function MultiStepForm() {
    const methods = useForm({ shouldUnregister: false });
    const { step, nextStep, prevStep } = useStep();

    const steps = [
        { component: <OneStep key="one" />,  },
        { component: <TwoStep key="two" />},
        { component: <ThreeStep key="three" />},
        { component: <FourStep key="four" /> },
        { component: <FiveStep key="five" /> },
        { component: <SixStep key="six" /> },
    ];

    const onSubmit = (data) => {
        console.log('Final data:', data);
    };

    const handleNextStep = async () => {
        const isStepValid = await methods.trigger();
        if (isStepValid) {
            nextStep();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <StepIndicator />
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
            <MultiStepForm />
        </StepProvider>
    );
}