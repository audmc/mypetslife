import { DateUtils } from 'react-day-picker';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

export function parseDate(str, format) {
    const parsed = dateFnsParse(str, format, new Date());
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

export function formatDate(date, format) {
    return dateFnsFormat(date, format );
}
