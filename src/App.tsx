import CinemaSeatBooking from "./components/CinemaSeatBooking";

const hoytsCinema = {
  title: 'Hoyts Cinema Booking',
  subtitle: 'Book you seat on Hoyts',
  currency: 'AUD',
  bookedSeats: ['A1', 'A2', 'B3'],
  layout: {
    rows: 10,
    columns: 8,
    dividerPosition: 6,
  },
  seatTypes: [
    {
      type: 'Standard',
      price: 15,
      color: 'green',
      rows: [1, 2, 3, 4, 5],
    },
    {
      type: 'Premium',
      price: 25,
      color: 'blue',
      rows: [6, 7, 8, 9, 10],
    },
  ],
};


const App = () => {
  return <div>
    <CinemaSeatBooking
      {...hoytsCinema}
      onBook={(selectedSeats) => console.log('Booking confirmed for seats:', selectedSeats)}
    />
  </div>;
};

export default App;
