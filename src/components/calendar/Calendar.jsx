import dayjs from 'dayjs';
import 'dayjs/locale/ca';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import React from 'react';
import { TitleSelectDate } from './CalendarStyled';

const currentDay = dayjs();
const getCurrentYear = () => currentDay.year();

const getDateRangeForYear = (year) => {
  return {
    minDateValue: dayjs(`${year}-01-01`),
    maxDateValue: dayjs(`${year}-12-31`)
  };
};

const shouldDisableDate = (date) => {
  const currentYear = getCurrentYear();
  const { minDateValue, maxDateValue } = getDateRangeForYear(currentYear);

  if (date.isBefore(minDateValue, 'day') || date.isAfter(maxDateValue, 'day')) {
    return true;
  }

  if (date.day() === 0 || date.day() === 6) {
    return true;
  }

  return false;
};

const shouldDisableMonth = (date) => {
  const monthStart = date.startOf('month');
  const monthEnd = date.endOf('month');

  if (monthStart.isBefore(currentDay, 'month')) {
    return true;
  }

  if (monthEnd.isAfter(getDateRangeForYear(getCurrentYear()).maxDateValue, 'month')) {
    return true;
  }

  return false;
};

const dayOfWeekFormatter = (day) => {
  return day.format('dd');
};

function ServerDay(props) {
  const { day, outsideCurrentMonth, ...other } = props;

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
    />
  );
}

export default function Calendar({setError}) {
  const [selectedDate, setSelectedDate] = React.useState(null);
  

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (newDate) {
      const today = dayjs().startOf('day');
      if (newDate.isBefore(today)) {
        setError("Selecció incorrecte. Tria un dia a partir d' avui.");
      } else {
        setError('');
      }
    } else {
      setError('Selecciona un día.');
    }
  };

  return (
    <>
      <TitleSelectDate>Selecciona un dia</TitleSelectDate>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ca">
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          slots={{
            day: ServerDay,
          }}
          minDate={getDateRangeForYear(getCurrentYear()).minDateValue}
          maxDate={getDateRangeForYear(getCurrentYear()).maxDateValue}
          shouldDisableDate={shouldDisableDate}
          shouldDisableMonth={shouldDisableMonth}
          dayOfWeekFormatter={dayOfWeekFormatter}
        />
      </LocalizationProvider>
    </>
  );
}