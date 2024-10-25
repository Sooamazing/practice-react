import React from 'react';
import { useFormContext, useController } from "react-hook-form";

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
    const { field: endMonth } = useController({
        name: 'education.end.month',
        control,
        rules: {
            validate: (value) => {
                const startYear = getValues('education.start.year');
                const startMonth = getValues('education.start.month');
                const endYear = getValues('education.end.year');
                if (value || startYear || startMonth || endYear) {
                    if (!value) return 'End month is required';
                    const startDate = new Date(startYear, startMonth - 1);
                    const endDate = new Date(endYear, value - 1);
                    return endDate > startDate || 'End date must be after start date';
                }
                return true;
            }
        }
    });

    const onSubmit = (data) => {
        console.log('OneStep data:', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div>
                시작 년도: <input type="text" {...startYear} placeholder="Start Year" /><br />
                {errors.education?.start?.year && <span>{errors.education.start.year.message}</span>}
            </div>
            <div>
                시작 월: <input type="text" {...startMonth} placeholder="Start Month" /><br />
                {errors.education?.start?.month && <span>{errors.education.start.month.message}</span>}
            </div>
            <div>
                마감 년도: <input type="text" {...endYear} placeholder="End Year" /><br />
                {errors.education?.end?.year && <span>{errors.education.end.year.message}</span>}
            </div>
            <div>
                마감 월: <input type="text" {...endMonth} placeholder="End Month" /><br />
                {errors.education?.end?.month && <span>{errors.education.end.month.message}</span>}
            </div>
            <button type="button">Submit</button>
        </form>
    );
}

export default OneStep;