import { motion } from 'framer-motion';
import type { BookingSuccessProps } from '../types';

const BookingSuccess = ({
  title,
  currency,
  seats,
  totalPrice,
  bookingId,
  onBookAnother,
}: BookingSuccessProps) => {
  return (
    <div className="flex flex-col items-center min-h-screen max-w-180 mx-auto p-4 [perspective:1200px]">
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full max-w-md mt-10 bg-gray-50 rounded-2xl shadow-2xl p-8 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
          className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg mb-5"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
            />
          </motion.svg>
        </motion.div>

        <h2 className="text-2xl font-extrabold text-green-600 mb-1">Booking Confirmed!</h2>
        <p className="text-gray-500 text-sm mb-6">{title}</p>

        <div className="w-full bg-white rounded-xl p-5 shadow-inner mb-6 text-sm text-gray-600">
          <div className="flex justify-between mb-2">
            <span>Booking ID</span>
            <span className="font-bold text-gray-800">{bookingId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Seats</span>
            <span className="font-bold text-gray-800">{seats.map((s) => s.id).join(', ')}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Paid</span>
            <span className="font-bold text-blue-600">{currency} {totalPrice}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBookAnother}
          className="w-full py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors"
        >
          Book Another Show
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
