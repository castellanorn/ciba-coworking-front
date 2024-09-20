import { useState } from "react";
import DayPicker from "./DayPicker";
import SelectDayDialog from "./SelectDayDialog";

export default function PopUpReserve() {
    const [open, setOpen] = useState(false); 
    const [selectedDay, setSelectedDay] = useState(null); 
    const [selectedDays, setSelectedDays] = useState([]); 

    const handleSelectDay = (day) => {
        setSelectedDay(day); 
        setOpen(true); 
    };
    
    const handleConfirmSearch = () => {
        const dayOfMonth = selectedDay.date(); 
        setSelectedDays((prevSelectedDays) =>
            prevSelectedDays.includes(dayOfMonth)
                ? prevSelectedDays 
                : [...prevSelectedDays, dayOfMonth] 
        );
        setOpen(false);
    };

    
    const handleCancelSearch = () => {
        setOpen(false); 
    };

    return (
        <>            
            <SelectDayDialog
                open={open}
                onConfirm={handleConfirmSearch}
                onCancel={handleCancelSearch}
            />            
            <DayPicker
                day={selectedDay || new Date()}
                isSelected={selectedDays.includes(selectedDay?.date())} 
                onSelectDay={handleSelectDay} 
            />
        </>
    );
}