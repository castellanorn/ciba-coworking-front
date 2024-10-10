export function formatTime(time24) {
    const [hours, minutes] = time24.split(':');
    const hoursInt = parseInt(hours, 10);
    const suffix = hoursInt >= 12 ? 'pm' : 'am';
    const formattedHours = hoursInt % 12 === 0 ? 12 : hoursInt % 12;  // Convierte 0 a 12 y las horas PM
    return `${formattedHours}${suffix}`;
}