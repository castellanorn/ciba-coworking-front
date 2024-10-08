export const splitReservations = (reservations) => {
    const today = new Date().setHours(0, 0, 0, 0); 

    const futureReservations = reservations.filter(reservation => {
        const endDate = new Date(reservation.endDate).setHours(0, 0, 0, 0);
        return endDate >= today; 
    });

    const pastReservations = reservations.filter(reservation => {
        const endDate = new Date(reservation.endDate).setHours(0, 0, 0, 0);
        return endDate < today;   
    });

    return { futureReservations, pastReservations }; 
};