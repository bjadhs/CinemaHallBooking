import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SeatInfo, SeatLayout, SeatType } from '../types';
import SeatIcon, { type SeatState } from './SeatIcon';

interface SeatSelectionProps {
  currency: string;
  layout: SeatLayout;
  seatTypes: SeatType[];
  bookedSeats: string[];
  selectedSeats: string[];
  totalPrice: number;
  onToggleSeat: (seatId: string) => void;
  onBack: () => void;
  onProceed: () => void;
}

const SeatSelection = ({
  currency,
  layout,
  seatTypes,
  bookedSeats,
  selectedSeats,
  totalPrice,
  onToggleSeat,
  onBack,
  onProceed,
}: SeatSelectionProps) => {
  const seats = useMemo(() => {
    const getSeatType = (rowNumber: number) =>
      seatTypes.find((type) => type.rows.includes(rowNumber));

    const rows = [];
    for (let i = 0; i < layout.rows; i++) {
      const seatTypeInfo = getSeatType(i + 1);
      const row: SeatInfo[] = [];
      for (let j = 1; j <= layout.columns; j++) {
        const id = `${String.fromCharCode(65 + i)}${j}`;
        row.push({
          id,
          type: seatTypeInfo?.type ?? 'Standard',
          price: seatTypeInfo?.price ?? 0,
          accent: seatTypeInfo?.accent ?? 'white',
        });
      }
      rows.push(row);
    }
    return rows;
  }, [layout, seatTypes]);

  const seatState = (seat: SeatInfo): SeatState => {
    if (bookedSeats.includes(seat.id)) return 'booked';
    if (selectedSeats.includes(seat.id)) {
      return seat.accent === 'purple' ? 'selected-purple' : 'selected-white';
    }
    return 'available';
  };

  return (
    <div className="flex flex-col h-full px-5 pt-10 pb-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
          aria-label="Back"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
        <h1 className="text-lg font-semibold">Select Seats</h1>
        <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="18" rx="3" />
            <path d="M3 9h18M8 2v4M16 2v4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Curved screen */}
      <div className="relative mt-8 mb-2 h-16">
        <svg viewBox="0 0 320 70" className="w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="1" />
              <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 50 Q160 0 300 50"
            stroke="url(#screenGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 4px 14px rgba(124,92,255,0.7))' }}
          />
        </svg>
      </div>

      {/* Seat grid */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center gap-3"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {seats.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center"
          >
            {row.map((seat) => {
              const isAisle = seat.id.endsWith(String(layout.dividerPosition));
              return (
                <div key={seat.id} className={`px-1 ${isAisle ? 'mr-7' : ''}`}>
                  <SeatIcon
                    state={seatState(seat)}
                    label={`${seat.id} · ${seat.type} · ${currency}${seat.price}`}
                    onClick={() => onToggleSeat(seat.id)}
                  />
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>

      {/* Footer: total + proceed */}
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-white/50 text-sm">Total</p>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={totalPrice}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-3xl font-bold"
            >
              {currency}{totalPrice}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={selectedSeats.length > 0 ? { scale: 1.06 } : undefined}
          whileTap={selectedSeats.length > 0 ? { scale: 0.94 } : undefined}
          onClick={() => selectedSeats.length > 0 && onProceed()}
          disabled={selectedSeats.length === 0}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            selectedSeats.length > 0
              ? 'bg-white text-slate-900 shadow-[0_0_25px_rgba(255,255,255,0.35)]'
              : 'bg-white/20 text-white/40 cursor-not-allowed'
          }`}
          aria-label="Proceed to ticket"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default SeatSelection;
