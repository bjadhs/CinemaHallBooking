import { useState, useMemo } from 'react';
import type { CinemaBookingProps } from '../types';

const CinemaSeatBooking = ({
  title,
  subtitle,
  currency,
  bookedSeats,
  layout,
  seatTypes,
}: CinemaBookingProps) => {
  const initialSeats = useMemo(() => {
    const seats = [];
    const getSeatType = (rowNumber: number) => {
      return seatTypes.find((type) => type.rows.includes(rowNumber) || null);
    };
    for (let i = 0; i < layout.rows; i++) {
      const seatRows = [];
      const seatTypeInfo = getSeatType(i + 1);
      for (let j = 1; j <= layout.columns; j++) {
        const seatId = `${String.fromCharCode(65 + i)}${j}`;
        seatRows.push({
          id: seatId,
          row: i,
          column: j,
          type: seatTypeInfo?.type || 'Regular',
          price: seatTypeInfo?.price || 15,
          color: seatTypeInfo?.color || 'blue',
          status: bookedSeats.includes(seatId) ? 'booked' : 'available',
          isSelected: false,
        });
      }
      seats.push(seatRows);
    }
    return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);


  return (
    <div className='flex flex-col items-center min-h-screen max-w-180 mx-auto p-4'>
      {/* Title and subtitle */}
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-extrabold'>{title}</h1>
        <p className='text-gray-600 text-xs'>{subtitle}</p>
      </div>

      {/* Screen */}
      <div className='w-full bg-linear-to-r   from-gray-300 via-gray-500 to-gray-700 rounded-lg p-2 m-6 text-center'>
        <h3 className='text-white font-bold'>SCREEN</h3>
      </div>

      {/* Seat Layout */}
      <div>
        {seats.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className='flex mb-2'>
              {row.map((seat, seatIndex) => {
                const seatClasses = `w-8 h-8 m-1 flex items-center justify-center rounded cursor-pointer ${seat.isBooked
                    ? 'bg-gray-400 cursor-not-allowed'
                    : selectedSeats.includes(seat.id)
                      ? 'bg-yellow-400'
                      : `bg-${seat.type.color}-500 hover:bg-${seat.type.color}-400`
                  }`;
                return (
                  <div key={seatIndex} className={seatClasses}>
                    {seatIndex + 1}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className='flex mt-6 space-x-4'>
        {seatTypes.map((type) => (
          <div key={type.type} className='flex items-center'>
            <div className={`w-4 h-4 rounded mr-2 bg-${type.color}-500`}></div>
            <span className='text-sm'>{type.type}</span>
          </div>
        ))}
      </div>
      {/* Booking Button */}
      <button className='mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Book Selected Seats
      </button>

      {/* Selected Seats and Total Price */}
      <div className='mt-6'>
        <p className='text-lg font-semibold'>
          Selected Seats: {selectedSeats.length}
        </p>
        <p className='text-lg font-semibold'>
          Total Price: {currency} {selectedSeats.length * 10}
        </p>
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
