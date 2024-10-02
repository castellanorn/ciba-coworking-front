import { TitleSelectDate } from "../calendar/CalendarStyled";
import { Option, Select } from "./InputStyled";

function HourSelect() {
    const hours = [];

    for (let i = 8; i < 20; i++) {
        const startHour = i < 10 ? `0${i}:00` : `${i}:00`;
        const endHour = (i + 1) < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
        hours.push(<option key={startHour} value={`${startHour}-${endHour}`}>{`${startHour}-${endHour}h`}</option>);
    }

    return (
        <>
        <TitleSelectDate>Selecciona l' hora</TitleSelectDate>
        <Select>
            <Option value="" disabled selected>Selecciona l' hora</Option>
            {hours}
        </Select>
        </>
    );
}

export default HourSelect;