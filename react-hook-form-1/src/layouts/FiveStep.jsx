import React from 'react';
import { useController, useFormContext, useWatch } from "react-hook-form";
import moment from 'moment';

/**
 * year, month, day -> 각 단계 입력해야만 다음 단계 DISABLED 풀림.
 *  name은 day의 이름에서 . 기준 Split, 앞 부분에 Year, month만 더해 찾기
 *  day까지 입력 후 Year, month 바꾸면 해당 월 내에 있는지 확인 후 없다면 다시 day 입력해야 함.
 */
function FiveStep() {
    const { control, setValue } = useFormContext();
    const { field: day } = useController({ name: 'a.b.date.day', control });

    // name은 day의 이름에서 . 기준 Split, 앞 부분에 Year, month만 더해 찾기
    const prefix = day.name.split('.').slice(0, -1).join('.');
    const yearName = `${prefix}.year`;
    const monthName = `${prefix}.month`;

    const { field: year } = useController({ name: yearName, control });
    const { field: month } = useController({ name: monthName, control });

    const yearValue = useWatch({ control, name: yearName });
    const monthValue = useWatch({ control, name: monthName });
    const dayValue = useWatch({ control, name: day.name });

    const isMonthEnabled = !!yearValue;
    const isDayEnabled = !!yearValue && !!monthValue;

    const lastDayOfMonth = yearValue && monthValue
        ? moment(`${yearValue}-${monthValue}`, 'YYYY-MM').endOf('month').date()
        : null;

    // day까지 입력 후 Year, month 바꾸면 해당 월 내에 있는지 확인 후 없다면 다시 day 입력해야 함.
    if (dayValue && yearValue && monthValue) {
        const lastDay = moment(`${yearValue}-${monthValue}`, 'YYYY-MM').endOf('month').date();
        if (dayValue > lastDay) {
            setValue(day.name, '');
        }
    }

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