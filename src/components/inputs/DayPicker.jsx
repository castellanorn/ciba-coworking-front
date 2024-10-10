import { Badge } from "@mui/material";
import { PickersDay } from "@mui/x-date-pickers";
export default function DayPicker({ day, isSelected, onSelectDay }) {
    return (
        <Badge
            key={day.toString()} 
            overlap="circular"
            badgeContent={isSelected ? "🔴" : undefined} 
        >
            <PickersDay
                day={day}
                outsideCurrentMonth={false} 
                onClick={() => onSelectDay(day)} 
            />
        </Badge>
    );
}