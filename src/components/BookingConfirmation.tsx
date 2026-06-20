import { motion } from 'framer-motion';
import type { BookingConfirmationProps } from '../types';

const BookingConfirmation = ({
  title,
  currency,
  seats,
  totalPrice,
  onConfirm,
  onBack,
}: BookingConfirmationProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen max-w-180 mx-auto p-4 [perspective:1200px]">
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full max-w-md mt-10 bg-gray-50 rounded-2xl shadow-2xl p-8"
      >
        <h2 className="text-2xl font-extrabold text-center text-green-600 mb-1">
          Confirm Your Booking
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">{title}</p>

        <div className="bg-white rounded-xl p-5 shadow-inner mb-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            Selected Seats
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {seats.map((seat, i) => (
              <motion.span
                key={seat.id}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 rounded-full bg-yellow-400 text-black text-sm font-bold"
              >
                {seat.id}
              </motion.span>
            ))}
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-600">
            {seats.map((seat) => (
              <div key={seat.id} className="flex justify-between">
                <span>{seat.id} &middot; {seat.type}</span>
                <span>{currency} {seat.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center px-1 mb-8">
          <span className="text-gray-600 font-medium">Total</span>
          <span className="text-2xl font-extrabold text-blue-600">
            {currency} {totalPrice}
          </span>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBack}
            className="flex-1 py-3 rounded-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Edit Seats
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onConfirm}
            className="flex-1 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors"
          >
            Confirm Booking
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
