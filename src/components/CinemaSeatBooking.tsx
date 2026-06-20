import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie, MovieBookingProps, SeatInfo } from '../types';
import HomeScreen from './HomeScreen';
import SeatSelection from './SeatSelection';
import TicketScreen from './TicketScreen';

type Screen = 'home' | 'seats' | 'ticket';

// Each screen slides in from the right and out to the left for a native app feel.
const screenVariants = {
  enter: { x: '100%', opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

const CinemaSeatBooking = ({
  userName,
  currency,
  categories,
  movies,
  showtime,
  orderNumber,
  layout,
  bookedSeats,
  seatTypes,
  onBook,
}: MovieBookingProps) => {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const priceFor = useMemo(() => {
    const map = new Map<number, { price: number; type: string; accent: 'white' | 'purple' }>();
    seatTypes.forEach((t) =>
      t.rows.forEach((r) => map.set(r, { price: t.price, type: t.type, accent: t.accent })),
    );
    return map;
  }, [seatTypes]);

  const selectedSeatDetails: SeatInfo[] = useMemo(
    () =>
      selectedSeats.map((id) => {
        const rowNumber = id.charCodeAt(0) - 64;
        const info = priceFor.get(rowNumber);
        return {
          id,
          type: info?.type ?? 'Standard',
          price: info?.price ?? 0,
          accent: info?.accent ?? 'white',
        };
      }),
    [selectedSeats, priceFor],
  );

  const totalPrice = useMemo(
    () => selectedSeatDetails.reduce((sum, s) => sum + s.price, 0),
    [selectedSeatDetails],
  );

  const toggleSeat = (seatId: string) => {
    if (bookedSeats.includes(seatId)) return;
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId],
    );
  };

  const handleProceed = () => {
    onBook?.(selectedSeats);
    setScreen('ticket');
  };

  const handleReset = () => {
    setSelectedSeats([]);
    setScreen('home');
  };

  return (
    <div className="w-full flex items-center justify-center bg-[#5f6672] min-h-[100dvh] sm:p-4">
      {/* Phone frame — full-bleed on phones, framed on larger screens */}
      <div className="relative w-full h-[100dvh] overflow-hidden bg-gradient-to-b from-[#272b38] via-[#21242f] to-[#191b24] [perspective:1200px] sm:max-w-[390px] sm:h-[760px] sm:rounded-[2.5rem] sm:shadow-2xl">
        {/* Ambient purple glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl" />

        <AnimatePresence mode="wait" initial={false}>
          {screen === 'home' && (
            <motion.div
              key="home"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <HomeScreen
                userName={userName}
                categories={categories}
                movies={movies}
                onSelectMovie={(movie) => {
                  setSelectedMovie(movie);
                  setScreen('seats');
                }}
              />
            </motion.div>
          )}

          {screen === 'seats' && (
            <motion.div
              key="seats"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <SeatSelection
                currency={currency}
                layout={layout}
                seatTypes={seatTypes}
                bookedSeats={bookedSeats}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                onToggleSeat={toggleSeat}
                onBack={() => setScreen('home')}
                onProceed={handleProceed}
              />
            </motion.div>
          )}

          {screen === 'ticket' && (
            <motion.div
              key="ticket"
              variants={screenVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <TicketScreen
                movieTitle={selectedMovie.title}
                showtime={showtime}
                orderNumber={orderNumber}
                seats={selectedSeatDetails}
                currency={currency}
                totalPrice={totalPrice}
                onDone={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CinemaSeatBooking;
