import { formatDate } from "./formatDate";

export const splitReservations = (reservations) => {
    const today = new Date().setHours(0, 0, 0, 0); 

    const futureReservations = reservations.filter(reservation => {
        const endDate = new Date(reservation.endDate).setHours(0, 0, 0, 0);
        return endDate >= today; 
    })
    .map(reservation =>({
        ...reservation,
        startDate: formatDate(reservation.startDate),
        endDate: formatDate(reservation.endDate), 
    }))

    const pastReservations = reservations.filter(reservation => {
        const endDate = new Date(reservation.endDate).setHours(0, 0, 0, 0);
        return endDate < today;   
    })
    .map(reservation =>({
        ...reservation,
        startDate: formatDate(reservation.startDate),
        endDate: formatDate(reservation.endDate), 
    }))

    return { futureReservations, pastReservations }; 
};