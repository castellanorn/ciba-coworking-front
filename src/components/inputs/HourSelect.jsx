import { Option, Select } from "../inputs/styled/InputStyled";

function HourSelect() {
    const hours = [];

    for (let i = 8; i < 20; i++) {
        const startHour = i < 10 ? `0${i}:00` : `${i}:00`;
        const endHour = (i + 1) < 10 ? `0${i + 1}:00` : `${i + 1}:00`;
        hours.push(<option key={startHour} value={`${startHour}-${endHour}`}>{`${startHour}-${endHour}h`}</option>);
    }

    return (
        <Select>
            <Option value="" disabled selected>Selecciona una hora</Option>
            {hours}
        </Select>
    );
}

export default HourSelect;