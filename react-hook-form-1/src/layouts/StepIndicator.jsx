import React from 'react';
import { useStep } from '../contexts/StepContext';

const StepIndicator = () => {
    const { step, goToStep } = useStep();
    const steps = ["시작", "힘내", "좀더", "야호", "일자", "의존확인"];

    return (
        <div>
            {steps.map((label, index) => {
                let style = { cursor: 'pointer' };
                if (index < step) {
                    style.color = 'black';
                } else if (index === step) {
                    style.color = 'blue';
                    style.fontWeight = 'bold';
                } else {
                    style.color = 'gray';
                }

                return (
                    <span
                        key={index}
                        onClick={() => goToStep(index)}
                        style={style}
                    >
                        {index + 1} {label} {index < steps.length - 1 && ' > '}
                    </span>
                );
            })}
        </div>
    );
};

export default StepIndicator;