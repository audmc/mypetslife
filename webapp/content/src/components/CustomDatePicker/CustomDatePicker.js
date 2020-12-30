import React from "react";
import './CustomDatePicker.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import WEEKDAYS_SHORT from "../../utils/calendarParameters/weekdayShort";
import FIRST_DAY_OF_WEEK from "../../utils/calendarParameters/firstDayOfWeek";
import MONTHS from "../../utils/calendarParameters/month";
import WEEKDAYS_LONG from "../../utils/calendarParameters/weekdayLong";
import modifiers from "../../utils/calendarParameters/modifiers";
import modifiersStyles from "../../utils/calendarParameters/modifiersStyle";

import FORMAT from "../../utils/calendarParameters/formatDate";
import {formatDate, parseDate} from "../../utils/calendarParameters/dateParsers";
import {retrieveLanguage} from "../../utils/user-infos";

export default function CustomDatePicker(props) {

    function handleChangeDate(day) {
        props.onChange(day);
    }

    return (
        <DayPickerInput
            value={props.value}
            onDayChange={day => handleChangeDate(day)}
            format={FORMAT[retrieveLanguage()]}
            placeholder={FORMAT[retrieveLanguage()].toUpperCase()}
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
                weekdaysShort:WEEKDAYS_SHORT[retrieveLanguage()],
                firstDayOfWeek:FIRST_DAY_OF_WEEK[retrieveLanguage()],
                months:MONTHS[retrieveLanguage()],
                weekdaysLong:WEEKDAYS_LONG[retrieveLanguage()],
                modifiers:modifiers,
                modifiersStyles:modifiersStyles[(props.style) ? props.style : 'blue'],
            }}
        />
    );
}
