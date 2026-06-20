import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import type { SeatInfo, Showtime } from '../types';

interface TicketScreenProps {
  movieTitle: string;
  showtime: Showtime;
  orderNumber: string;
  seats: SeatInfo[];
  currency: string;
  totalPrice: number;
  onDone: () => void;
}

const TicketScreen = ({
  movieTitle,
  showtime,
  orderNumber,
  seats,
  currency,
  totalPrice,
  onDone,
}: TicketScreenProps) => {
  return (
    <div className="flex flex-col h-full px-6 pt-12 pb-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex-1 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center pt-8 pb-7 px-6"
      >
        {/* Title */}
        <h1 className="text-xl font-bold">{movieTitle}</h1>
        <p className="text-white/50 text-sm mt-1">{showtime.shortDate}</p>

        {/* Show details */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">{showtime.hall}</p>
          <p className="text-2xl font-bold mt-1">{showtime.date}</p>
          <p className="text-white/50 text-sm mt-1">{showtime.time}</p>
        </div>

        <div className="mt-7 text-center">
          <p className="text-white/50 text-sm">Order number</p>
          <p className="text-xl font-semibold tracking-wide mt-1">{orderNumber}</p>
        </div>

        {/* Perforation + side notches */}
        <div className="relative w-full my-6">
          <div className="border-t border-dashed border-white/20" />
          <span className="absolute -left-9 -top-3 w-6 h-6 rounded-full bg-[#5f6672]" />
          <span className="absolute -right-9 -top-3 w-6 h-6 rounded-full bg-[#5f6672]" />
        </div>

        {/* QR code */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 18 }}
          style={{ filter: 'drop-shadow(0 0 18px rgba(214,51,255,0.55))' }}
        >
          <QRCodeSVG
            value={`CINEMA|${movieTitle}|${showtime.date} ${showtime.time}|${showtime.hall}|seats:${seats
              .map((s) => s.id)
              .join(',')}|order:${orderNumber}|paid:${currency}${totalPrice}`}
            size={176}
            bgColor="transparent"
            fgColor="#d633ff"
            level="M"
          />
        </motion.div>

        <p className="mt-4 text-xs text-white/40">
          Seats {seats.map((s) => s.id).join(', ')} · Paid {currency}{totalPrice}
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onDone}
        className="mt-6 w-full py-4 rounded-2xl font-semibold bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-900/40"
      >
        Book Another Movie
      </motion.button>
    </div>
  );
};

export default TicketScreen;
