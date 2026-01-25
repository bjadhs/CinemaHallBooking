export interface CinemaBookingProps {
    title: string;
    subtitle: string;
    currency: string;
    bookedSeats: string[];
    layout: {
            rows: number;
            columns: number;
            dividerPosition: number;
        };
    seatTypes: {
            type: string;
            price: number;
            color: string;
            rows: number[];
        }[];
}