import React from "react";
import { Option, Select } from "./InputStyled";
import { TitlePage } from "../title/TitleStyled";
import { TitleSelectDate } from "../calendar/CalendarStyled";

const HourSelect = ({ availableHours, selectedHour, onChange }) => {

  return (
    <>
      <TitleSelectDate>Selecciona l'hora</TitleSelectDate>
      <Select value={selectedHour?.startTime || ""} onChange={onChange}>
        <Option value="" disabled>
          Selecciona l'hora
        </Option>
        {availableHours.map((hour, index) => (
          <Option key={index} value={hour.startDate}>
            {hour.startDate} - {hour.endDate}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default HourSelect;
