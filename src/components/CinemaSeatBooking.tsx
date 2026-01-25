import { useState, useMemo } from 'react';
import type { CinemaBookingProps } from '../types';

const CinemaSeatBooking = ({
  title,
  subtitle,
  currency,
  bookedSeats,
  layout,
  seatTypes,
  onBook,
}: CinemaBookingProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const seats = useMemo(() => {
    const rows = [];
    const getSeatType = (rowNumber: number) => {
      return seatTypes.find((type) => type.rows.includes(rowNumber));
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
          color: seatTypeInfo?.color || 'blue', // Fallback color
          isBooked: bookedSeats.includes(seatId),
        });
      }
      rows.push(seatRows);
    }
    return rows;
  }, [layout, seatTypes, bookedSeats]);

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seatId) => {
      // Find the seat price. This is a bit inefficient (nested loop), but for a cinema hall it's negligible.
      // Optimization: Create a seatMap in useMemo if needed.
      for (const row of seats) {
        const seat = row.find((s) => s.id === seatId);
        if (seat) return total + seat.price;
      }
      return total;
    }, 0);
  }, [selectedSeats, seats]);

  // Safe color mapper for Tailwind
  const getColorClasses = (color: string, isBooked: boolean, isSelected: boolean) => {
    if (isBooked) return 'bg-gray-400 cursor-not-allowed';
    if (isSelected) return 'bg-yellow-400 text-black'; // Selected state

    // Map known colors to classes to ensure Tailwind picks them up if they are safelisted or just standard
    // Ideally we'd use objects like { green: 'bg-green-500 hover:bg-green-400', ... }
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500 hover:bg-blue-400',
      green: 'bg-green-500 hover:bg-green-400',
      red: 'bg-red-500 hover:bg-red-400',
      purple: 'bg-purple-500 hover:bg-purple-400',
    };

    return colorMap[color] || `bg-${color}-500 hover:bg-${color}-400`;
  };

  return (
    <div className='flex flex-col items-center min-h-screen max-w-180 mx-auto p-4'>
      {/* Title and subtitle */}
      <div className='flex flex-col items-center mb-6'>
        <h1 className='text-3xl font-extrabold'>{title}</h1>
        <p className='text-gray-600 text-xs mt-1'>{subtitle}</p>
      </div>

      {/* Screen */}
      <div className='w-full max-w-lg mb-8'>
        <div className='w-full h-12 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 rounded-lg flex items-center justify-center transform [perspective:500px] [transform:rotateX(20deg)] shadow-lg'>
          <h3 className='text-white font-bold tracking-widest text-sm'>SCREEN</h3>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="flex flex-col gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className='flex justify-center gap-2'>
            {row.map((seat) => {
              const isSelected = selectedSeats.includes(seat.id);
              const classes = `w-8 h-8 flex items-center justify-center rounded transition-colors duration-200 text-xs font-medium text-white ${getColorClasses(seat.color, seat.isBooked, isSelected)
                }`;

              return (
                <div
                  key={seat.id}
                  className={classes}
                  onClick={() => toggleSeat(seat.id)}
                  title={`${seat.id} - ${currency}${seat.price}`}
                >
                  {seat.column}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className='flex mt-10 space-x-6'>
        <div className='flex items-center'>
          <div className='w-4 h-4 rounded mr-2 bg-gray-400'></div>
          <span className='text-sm text-gray-700'>Booked</span>
        </div>
        <div className='flex items-center'>
          <div className='w-4 h-4 rounded mr-2 bg-yellow-400'></div>
          <span className='text-sm text-gray-700'>Selected</span>
        </div>
        {seatTypes.map((type) => (
          <div key={type.type} className='flex items-center'>
            <div className={`w-4 h-4 rounded mr-2 bg-${type.color}-500`}></div>
            <span className='text-sm text-gray-700'>{type.type} ({currency}{type.price})</span>
          </div>
        ))}
      </div>

      {/* Booking Actions */}
      <div className='mt-8 flex flex-col items-center bg-gray-50 p-6 rounded-xl w-full max-w-md'>
        <div className='flex justify-between w-full mb-4 px-4'>
          <span className='text-gray-600'>Selected Seats:</span>
          <span className='font-bold'>{selectedSeats.join(', ') || 'None'}</span>
        </div>
        <div className='flex justify-between w-full mb-6 px-4'>
          <span className='text-gray-600'>Total Price:</span>
          <span className='text-xl font-bold text-blue-600'>{currency} {totalPrice}</span>
        </div>

        <button
          className={`w-full py-3 rounded-lg font-bold text-white transition-colors duration-200 ${selectedSeats.length > 0
            ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
            : 'bg-gray-300 cursor-not-allowed'
            }`}
          onClick={() => selectedSeats.length > 0 && onBook?.(selectedSeats)}
          disabled={selectedSeats.length === 0}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
