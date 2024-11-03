import React from 'react';
import { useController, useFormContext, useWatch } from "react-hook-form";
import moment from 'moment';

/**
 * year, month, day -> 각 단계 입력해야만 DISABLED 풀림.
 */
function FiveStep() {
    const { control } = useFormContext();
    const { field: year } = useController({ name: 'date.year', control });
    const { field: month } = useController({ name: 'date.month', control });
    const { field: day } = useController({ name: 'date.day', control });

    const yearValue = useWatch({ control, name: 'date.year' });
    const monthValue = useWatch({ control, name: 'date.month' });

    const isMonthEnabled = !!yearValue;
    const isDayEnabled = !!yearValue && !!monthValue;

    const lastDayOfMonth = yearValue && monthValue
        ? moment(`${yearValue}-${monthValue}`, 'YYYY-MM').endOf('month').date()
        : null;

    return (
        <div>
            <input {...year} placeholder="Year" />
            <input {...month} placeholder="Month" disabled={!isMonthEnabled} />
            <input {...day} placeholder="Day" disabled={!isDayEnabled} />
            {lastDayOfMonth && <div>Last day of the month: {lastDayOfMonth}</div>}
        </div>
    );
}

export default FiveStep;