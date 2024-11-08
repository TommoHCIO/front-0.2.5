import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2024-12-01T00:00:00');
      const difference = endDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1E2A37]/80 to-[#1E2A37]/50 backdrop-blur-lg rounded-xl md:rounded-3xl p-4 md:p-8 text-white relative overflow-hidden border border-white/5 shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D9CDB]/5 to-transparent" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537504-6427a16b0a28')] opacity-5 bg-cover bg-center mix-blend-overlay" />
      
      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
          <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#2D9CDB]" />
          <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] bg-clip-text text-transparent">
            Incubation Period Ends In
          </h3>
        </div>
        
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                className="bg-gradient-to-br from-[#1E2A37] to-[#1E2A37]/80 w-full py-2 md:py-4 px-1 md:px-2 rounded-lg md:rounded-xl border border-white/10 mb-2 md:mb-3 shadow-lg"
              >
                <span className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] bg-clip-text text-transparent font-mono">
                  {unit.value.toString().padStart(2, '0')}
                </span>
              </motion.div>
              <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};