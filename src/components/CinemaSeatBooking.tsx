import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CinemaBookingProps, SeatInfo } from '../types';
import BookingConfirmation from './BookingConfirmation';
import BookingSuccess from './BookingSuccess';

type Step = 'selecting' | 'confirming' | 'success';

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
  const [step, setStep] = useState<Step>('selecting');
  const [bookingId, setBookingId] = useState('');

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

  const selectedSeatDetails: SeatInfo[] = useMemo(() => {
    return selectedSeats
      .map((seatId) => {
        for (const row of seats) {
          const seat = row.find((s) => s.id === seatId);
          if (seat) return { id: seat.id, type: seat.type, price: seat.price };
        }
        return null;
      })
      .filter((s): s is SeatInfo => s !== null);
  }, [selectedSeats, seats]);

  const totalPrice = useMemo(() => {
    return selectedSeatDetails.reduce((total, seat) => total + seat.price, 0);
  }, [selectedSeatDetails]);

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

  const handleProceedToConfirm = () => {
    if (selectedSeats.length === 0) return;
    setStep('confirming');
  };

  const handleConfirmBooking = () => {
    const id = `BK-${Date.now().toString(36).toUpperCase()}`;
    setBookingId(id);
    onBook?.(selectedSeats);
    setStep('success');
  };

  const handleBookAnother = () => {
    setSelectedSeats([]);
    setStep('selecting');
  };

  return (
    <div className="[perspective:1500px]">
      <AnimatePresence mode="wait">
        {step === 'selecting' && (
          <motion.div
            key="selecting"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex flex-col items-center min-h-screen max-w-180 mx-auto p-4"
          >
            {/* Title and subtitle */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center mb-6"
            >
              <h1 className="text-3xl font-extrabold text-green-600">{title}</h1>
              <p className="text-gray-600 text-xs mt-1 text-green-600">{subtitle}</p>
            </motion.div>

            {/* Screen */}
            <div className="w-full max-w-lg mb-8 [perspective:500px]">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 10px 25px -5px rgba(148,163,184,0.4)',
                    '0 10px 35px -2px rgba(148,163,184,0.8)',
                    '0 10px 25px -5px rgba(148,163,184,0.4)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-12 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 rounded-lg flex items-center justify-center [transform:rotateX(20deg)]"
              >
                <h3 className="text-white font-bold tracking-widest text-sm">SCREEN</h3>
              </motion.div>
            </div>

            {/* Seat Layout */}
            <motion.div
              className="flex flex-col gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04 } },
              }}
            >
              {seats.map((row, rowIndex) => (
                <motion.div
                  key={rowIndex}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  {/* Row Label */}
                  <div className="w-6 text-center font-bold text-gray-500 mr-2">
                    {String.fromCharCode(65 + rowIndex)}
                  </div>
                  {row.map((seat) => {
                    const isSelected = selectedSeats.includes(seat.id);
                    const isDivider = seat.column === layout.dividerPosition;
                    const classes = `w-8 h-8 flex items-center justify-center rounded text-[10px] text-white ${isDivider ? 'mr-8' : '' // Add gap for aisle
                      } ${getColorClasses(seat.color, seat.isBooked, isSelected)
                      }`;

                    return (
                      <motion.div
                        key={seat.id}
                        className={classes}
                        onClick={() => toggleSeat(seat.id)}
                        title={`${seat.id} - ${currency}${seat.price}`}
                        whileHover={
                          seat.isBooked
                            ? undefined
                            : { scale: 1.25, y: -4, rotateX: 15, zIndex: 10 }
                        }
                        whileTap={seat.isBooked ? undefined : { scale: 0.9 }}
                        animate={isSelected ? { y: [-2, -6, -2] } : { y: 0 }}
                        transition={
                          isSelected
                            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
                            : { type: 'spring', stiffness: 400, damping: 20 }
                        }
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {seat.id}
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>

            {/* Legend */}
            <div className="flex mt-10 space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2 bg-gray-400"></div>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded mr-2 bg-yellow-400"></div>
                <span className="text-sm text-gray-700">Selected</span>
              </div>
              {seatTypes.map((type) => (
                <div key={type.type} className="flex items-center">
                  <div className={`w-4 h-4 rounded mr-2 bg-${type.color}-500`}></div>
                  <span className="text-sm text-gray-700">{type.type} ({currency}{type.price})</span>
                </div>
              ))}
            </div>

            {/* Booking Actions */}
            <div className="mt-8 flex flex-col items-center bg-gray-50 p-6 rounded-xl w-full max-w-md">
              <div className="flex justify-between w-full mb-4 px-4">
                <span className="text-gray-600">Selected Seats:</span>
                <span className="font-bold">{selectedSeats.join(', ') || 'None'}</span>
              </div>
              <div className="flex justify-between w-full mb-6 px-4">
                <span className="text-gray-600">Total Price:</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="text-xl font-bold text-blue-600"
                  >
                    {currency} {totalPrice}
                  </motion.span>
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={selectedSeats.length > 0 ? { scale: 1.03 } : undefined}
                whileTap={selectedSeats.length > 0 ? { scale: 0.97 } : undefined}
                className={`w-full py-3 rounded-lg font-bold text-white transition-colors duration-200 ${selectedSeats.length > 0
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
                  }`}
                onClick={handleProceedToConfirm}
                disabled={selectedSeats.length === 0}
              >
                Book Ticket
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'confirming' && (
          <BookingConfirmation
            key="confirming"
            title={title}
            currency={currency}
            seats={selectedSeatDetails}
            totalPrice={totalPrice}
            onConfirm={handleConfirmBooking}
            onBack={() => setStep('selecting')}
          />
        )}

        {step === 'success' && (
          <BookingSuccess
            key="success"
            title={title}
            currency={currency}
            seats={selectedSeatDetails}
            totalPrice={totalPrice}
            bookingId={bookingId}
            onBookAnother={handleBookAnother}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinemaSeatBooking;
