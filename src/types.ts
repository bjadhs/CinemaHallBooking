export interface SeatInfo {
    id: string;
    type: string;
    price: number;
}

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
    onBook?: (seats: string[]) => void;
}

export interface BookingConfirmationProps {
    title: string;
    currency: string;
    seats: SeatInfo[];
    totalPrice: number;
    onConfirm: () => void;
    onBack: () => void;
}

export interface BookingSuccessProps {
    title: string;
    currency: string;
    seats: SeatInfo[];
    totalPrice: number;
    bookingId: string;
    onBookAnother: () => void;
}
