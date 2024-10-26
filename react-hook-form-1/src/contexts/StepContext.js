import React, { createContext, useContext, useState } from 'react';

const StepContext = createContext();

export const useStep = () => useContext(StepContext);

export const StepProvider = ({ children }) => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);
    const goToStep = (stepIndex) => setStep(stepIndex);

    return (
        <StepContext.Provider value={{ step, nextStep, prevStep, goToStep }}>
            {children}
        </StepContext.Provider>
    );
};