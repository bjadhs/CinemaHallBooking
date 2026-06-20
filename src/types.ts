export interface Movie {
  id: string;
  title: string;
  genre: string;
  /** Tailwind gradient classes used for the stylised poster, e.g. "from-amber-400 to-rose-500". */
  posterGradient: string;
  /** Short emoji shown on the poster as a lightweight stand-in for artwork. */
  posterEmoji: string;
}

export interface Category {
  label: string;
  emoji: string;
}

export interface Showtime {
  hall: string;
  date: string;       // "19 March 2022"
  shortDate: string;  // "19 Mar"
  time: string;       // "04:30"
}

export interface SeatType {
  type: string;
  price: number;
  /** "white" | "purple" — drives the selected-seat colour. */
  accent: 'white' | 'purple';
  rows: number[];
}

export interface SeatLayout {
  rows: number;
  columns: number;
  /** Column index after which the centre aisle is rendered. */
  dividerPosition: number;
}

export interface SeatInfo {
  id: string;
  type: string;
  price: number;
  accent: 'white' | 'purple';
}

export interface MovieBookingProps {
  userName: string;
  currency: string;
  categories: Category[];
  movies: Movie[];
  showtime: Showtime;
  orderNumber: string;
  layout: SeatLayout;
  bookedSeats: string[];
  seatTypes: SeatType[];
  onBook?: (seats: string[]) => void;
}
