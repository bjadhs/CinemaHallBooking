import CinemaSeatBooking from './components/CinemaSeatBooking';
import type { MovieBookingProps } from './types';

const bookingConfig: MovieBookingProps = {
  userName: 'Akshay',
  currency: '$',
  categories: [
    { label: 'Comedy', emoji: '😄' },
    { label: 'Horror', emoji: '🥶' },
    { label: 'Drama', emoji: '😡' },
  ],
  movies: [
    {
      id: 'incredibles-2',
      title: 'Incredibles 2',
      genre: 'Action · Animation',
      posterGradient: 'from-amber-400 via-orange-500 to-rose-600',
      posterEmoji: '🦸',
    },
    {
      id: 'spirited-away',
      title: 'Spirited Away',
      genre: 'Fantasy · Animation',
      posterGradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      posterEmoji: '🐉',
    },
    {
      id: 'interstellar',
      title: 'Interstellar',
      genre: 'Sci-Fi · Drama',
      posterGradient: 'from-slate-600 via-indigo-700 to-purple-800',
      posterEmoji: '🚀',
    },
  ],
  showtime: {
    hall: 'VIP Hall',
    date: '19 March 2022',
    shortDate: '19 Mar',
    time: '04:30',
  },
  orderNumber: '68956231546',
  layout: {
    rows: 6,
    columns: 8,
    dividerPosition: 4,
  },
  bookedSeats: ['A1', 'A2', 'B7', 'D6', 'F1'],
  seatTypes: [
    { type: 'Standard', price: 15, accent: 'white', rows: [1, 2, 3] },
    { type: 'Premium', price: 25, accent: 'purple', rows: [4, 5, 6] },
  ],
};

const App = () => (
  <CinemaSeatBooking
    {...bookingConfig}
    onBook={(seats) => console.log('Booking confirmed for seats:', seats)}
  />
);

export default App;
