import dayjs from "dayjs";
import "dayjs/locale/ca";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { TitleSelectDate } from "./CalendarStyled";
import { useState, useEffect, useContext } from "react";
import { DateCalendar } from "@mui/x-date-pickers";

import { AuthContext } from "../../auth/AuthProvider";


const currentDay = dayjs();
const getCurrentYear = () => currentDay.year();

const getDateRangeForYear = (year) => {
  return {
    minDateValue: dayjs(`${year}-01-01`),
    maxDateValue: dayjs(`${year}-12-31`),
  };
};

const shouldDisableDate = (date) => {
  const currentYear = getCurrentYear();
  const { minDateValue, maxDateValue } = getDateRangeForYear(currentYear);

  return (
    date.isBefore(minDateValue, "day") ||
    date.isAfter(maxDateValue, "day") ||
    date.day() === 0 || // Desactivar domingos
    date.day() === 6    // Desactivar sábados
  );
};

// Calcular días disponibles entre dos fechas
const countAvailableDays = (start, end) => {
  let availableDays = 0;
  let current = start.clone();

  while (current.isBefore(end, "day") || current.isSame(end, "day")) {
    // Contar solo si no es sábado o domingo
    if (current.day() !== 0 && current.day() !== 6) {
      availableDays++;
    }
    current = current.add(1, "day");
  }
  return availableDays;
};

const ServerDay = ({ day, outsideCurrentMonth, isSelected, selectedDates, ...other }) => {
  const startDate = selectedDates[0];
  const endDate = selectedDates[1];

  let backgroundColor = "";
  if (startDate && day.isSame(startDate, "day")) {
    backgroundColor = "slateblue"; 
  } else if (endDate && day.isSame(endDate, "day")) {
    backgroundColor = "lightgreen"; 
  }

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={isSelected}
      sx={{
        bgcolor: backgroundColor,
        "&:hover": {
          bgcolor: backgroundColor ? backgroundColor : "transparent",
        },
      }}
    />
  );
};

export default function Calendar({ onChange, setError }) {
  const [selectedDates, setSelectedDates] = useState([]); 
  const { userRole } = useContext(AuthContext);

  useEffect(() => {
    onChange(selectedDates); 
  }, [selectedDates, onChange]);

  const handleDateChange = (newDate) => {
    const today = dayjs().startOf("day");
  
    // Verifica si la nueva fecha es anterior al día actual
    if (newDate.isBefore(today)) {
      setError("Selecció incorrecte. Tria un dia a partir d'avui.");
      return;
    }
  
    // Si ya hay dos fechas seleccionadas, resetea y empieza con la nueva fecha seleccionada
    if (selectedDates.length === 2) {
      setSelectedDates([newDate]);
      setError("");  // Limpia cualquier error previo
      return;
    }
  
    // Si solo hay una fecha seleccionada, aplica lógica de rango de fechas
    if (selectedDates.length === 1) {
      const firstDate = selectedDates[0];
  
      // Verifica que la segunda fecha no sea anterior a la primera
      if (newDate.isBefore(firstDate, "day")) {
        setError("La data de final no pot ser anterior a la data de començament.");
        return;
      }
  

      // Cuenta los días disponibles y verifica si el rango es mayor de 7 días
      const availableDays = countAvailableDays(firstDate, newDate);
      
      if (availableDays > 7 && userRole === "user") {
        setError("No pots seleccionar un rang de dates amb més de 7 dies disponibles.");
        return;
      }
    }
  
    setError("");  // Limpia cualquier error previo
  
    // Si la nueva fecha ya está seleccionada, la elimina
    if (selectedDates.some((date) => date.isSame(newDate, "day"))) {
      setSelectedDates(selectedDates.filter((date) => !date.isSame(newDate, "day")));
    } else {
      // Si hay menos de dos fechas seleccionadas, añade la nueva fecha
      setSelectedDates([...selectedDates, newDate]);
    }
  };
  return (
    <>
      <TitleSelectDate>Selecciona la data</TitleSelectDate>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ca">
        
        <DateCalendar
          value={null}
          onChange={handleDateChange}
          slots={{
            day: (props) => (
              <ServerDay
                {...props}
                selectedDates={selectedDates} 
                isSelected={selectedDates.some((date) => date.isSame(props.day, "day"))}
              />
            ),
          }}
          minDate={dayjs()}
          maxDate={getDateRangeForYear(getCurrentYear()).maxDateValue}
          shouldDisableDate={shouldDisableDate}
          dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}.`}
          multiple
          disablePast
        />
      </LocalizationProvider>
    </>
  );
}