import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, RangeKeyDict } from 'react-date-range';

interface CalendarProps {
    startDate: Date;
    endDate: Date;
    disabledDates?: Date[];
    onChange: (startDate: Date, endDate: Date) => void;
}

interface pickedDateRange {
    startDate?: undefined | Date;
    endDate?: undefined | Date;
    key?: undefined | string;
}

export const Calendar: React.FC<CalendarProps> = ({startDate, endDate, disabledDates, onChange}) => {
    const [state, setState] = useState<pickedDateRange[]>([
        {
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }
    ]);

    const onDateChange = (item: RangeKeyDict) => {
        item.selection.startDate && item.selection.endDate &&
            onChange(item.selection.startDate, item.selection.endDate);


        setState([item.selection])

    }

    return (<DateRange
        className="calendar"
        showDateDisplay={false}
        onChange={onDateChange}
        moveRangeOnFirstSelection={false}
        minDate={new Date()}
        months={1}
        ranges={state}
        direction="horizontal"
        rangeColors={['#FF385CFF']}
        disabledDates={disabledDates}
    />);
};