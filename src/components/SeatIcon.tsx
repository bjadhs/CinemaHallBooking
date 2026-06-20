import { motion } from 'framer-motion';

type SeatState = 'available' | 'selected-white' | 'selected-purple' | 'booked';

interface SeatIconProps {
  state: SeatState;
  onClick?: () => void;
  label: string;
}

// Top-down cinema seat silhouette: a rounded backrest with a seat base.
const SEAT_PATH =
  'M5 9 Q5 4 10 4 H26 Q31 4 31 9 V17 Q31 20 28 20 H27 V14 Q27 12 24 12 H12 Q9 12 9 14 V20 H8 Q5 20 5 17 Z';

const FILLS: Record<SeatState, string> = {
  available: '#3b4256',
  'selected-white': '#ffffff',
  'selected-purple': '#7c5cff',
  booked: '#242838',
};

const SeatIcon = ({ state, onClick, label }: SeatIconProps) => {
  const isInteractive = state !== 'booked';
  const isSelected = state === 'selected-white' || state === 'selected-purple';

  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      whileHover={isInteractive ? { scale: 1.18, y: -2 } : undefined}
      whileTap={isInteractive ? { scale: 0.9 } : undefined}
      animate={isSelected ? { y: [0, -2, 0] } : { y: 0 }}
      transition={
        isSelected
          ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          : { type: 'spring', stiffness: 400, damping: 22 }
      }
      className={`relative ${isInteractive ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      style={{
        filter:
          state === 'selected-purple'
            ? 'drop-shadow(0 0 6px rgba(124,92,255,0.8))'
            : state === 'selected-white'
              ? 'drop-shadow(0 0 5px rgba(255,255,255,0.5))'
              : 'none',
      }}
    >
      <svg width="30" height="24" viewBox="0 0 36 24" fill="none">
        <path d={SEAT_PATH} fill={FILLS[state]} opacity={state === 'booked' ? 0.55 : 1} />
      </svg>
    </motion.button>
  );
};

export default SeatIcon;
export type { SeatState };
