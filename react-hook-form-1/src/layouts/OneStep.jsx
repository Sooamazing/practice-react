import React from 'react';
import { useFormContext, useController } from "react-hook-form";
import ControlledInput from "../features/ControlledInput";
import InputWithFormFeedback from "../features/InputWithFormFeedback";
import InputControllerInside from "../features/InputControllerInside";

/**
 *  각 상태에 따른 렌더링 확인
    TODO 다른 필드 값에 따른 Validation 확인 및 필수 여부 변경
    TODO validation에서 에러 메시지 localeId, defaultMessage 설정
 */
function OneStep() {
    const { handleSubmit, control, getValues, formState: { errors } } = useFormContext();
    const { field: startYear } = useController({
        name: 'education.start.year',
        control,
        rules: {
            validate: (value) => {
                const startMonth = getValues('education.start.month');
                const endYear = getValues('education.end.year');
                const endMonth = getValues('education.end.month');
                if (value || startMonth || endYear || endMonth) {
                    if (!value) return 'Start year is required';
                    const startDate = new Date(value, startMonth - 1);
                    const endDate = new Date(endYear, endMonth - 1);
                    return startDate < endDate || 'Start date must be before end date';
                }
                return true;
            }
        }
    });
    const { field: startMonth } = useController({
        name: 'education.start.month',
        control,
        rules: {
            validate: (value) => {
                const startYear = getValues('education.start.year');
                const endYear = getValues('education.end.year');
                const endMonth = getValues('education.end.month');
                if (value || startYear || endYear || endMonth) {
                    if (!value) return 'Start month is required';
                    const startDate = new Date(startYear, value - 1);
                    const endDate = new Date(endYear, endMonth - 1);
                    return startDate < endDate || 'Start date must be before end date';
                }
                return true;
            }
        }
    });

    const { field: endYear } = useController({
        name: 'education.end.year',
        control,
        rules: {
            validate: (value) => {
                const startYear = getValues('education.start.year');
                const startMonth = getValues('education.start.month');
                const endMonth = getValues('education.end.month');
                if (value || startYear || startMonth || endMonth) {
                    if (!value) return 'End year is required';
                    const startDate = new Date(startYear, startMonth - 1);
                    const endDate = new Date(value, endMonth - 1);
                    return endDate > startDate || 'End date must be after start date';
                }
                return true;
            }
        }
    });


    const onSubmit = (data) =>
    {
        console.log('OneStep data:', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <div>함수도 없는 그냥 layout에서 input 정의 <br/>
                <input type="text" placeholder="연결X"/>
            </div>

            <div>
                layout에서 controller, input, errorMessage 정의 -----
                <br/>
                <input type="text" {...startMonth} placeholder="Start Month"/><br/>
                {errors.education?.start?.month && <span>{errors.education.start.month.message}</span>}
            </div>
            <div>
                <ControlledInput type="text" field={startYear} placeholder="Start Year"/>
                {errors.education?.start?.year && <span>{errors.education.start.year.message}</span>}
            </div>
            <div>
                <InputWithFormFeedback type="text" field={endYear} errors={errors} placeholder="End Year"/>
            </div>
            <div>
                <InputControllerInside type="text" placeholder="End Month"/>
            </div>
        </form>
    );
}

export default OneStep;