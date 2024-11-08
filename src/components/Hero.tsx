import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { Button } from './Button';
import { Incubator } from './Incubator';
import { Countdown } from './Countdown';
import { LearnMoreModal } from './LearnMoreModal';
import { Leaderboard } from './Leaderboard';

const rewards = [
  { amount: '+1 $CTE', action: 'per view', id: 'view' },
  { amount: '+2 $CTE', action: 'per like', id: 'like' },
  { amount: '+5 $CTE', action: 'per comment', id: 'comment' },
  { amount: '+10 $CTE', action: 'per repost', id: 'repost' },
];

export const Hero = () => {
  const navigate = useNavigate();
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);

  const scrollToIncubator = () => {
    const incubatorElement = document.getElementById('incubator');
    if (incubatorElement) {
      incubatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4 md:space-y-8 px-3 md:px-8">
      <div className="bg-gradient-to-br from-[#1E2A37]/80 to-[#1E2A37]/50 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-12 text-white relative overflow-hidden border border-white/5 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D9CDB]/10 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 md:mb-12"
          >
            <div className="flex justify-center mb-4 md:mb-6">
              <motion.div 
                className="bg-gradient-to-br from-[#7F56D9] to-[#2D9CDB] w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-xl md:text-2xl font-bold relative shadow-lg pulse-ring"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CTE
                <div className="absolute -right-1 -top-1 w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-md" />
                <div className="absolute -left-1 -bottom-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-md" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl md:text-6xl font-bold mb-3 md:mb-6 bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] bg-clip-text text-transparent shimmer">
              Chat to Earn
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
              The Future of Social Engagement
            </p>

            <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-3xl mx-auto mb-6 md:mb-12">
              {rewards.map(({ amount, action, id }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-[#1E2A37] to-[#1E2A37]/80 rounded-lg md:rounded-xl p-3 md:p-6 border border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#2D9CDB]/20"
                >
                  <div className="text-base md:text-lg font-bold text-[#2D9CDB]">{amount}</div>
                  <div className="text-xs md:text-sm text-gray-400">{action}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-sm md:text-lg text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
              Join our revolutionary platform where social engagement meets blockchain rewards.
            </p>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              <div className="flex gap-3 md:gap-4">
                <Button 
                  variant="primary"
                  icon={ArrowRight}
                  className="bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base pulse-ring"
                  onClick={scrollToIncubator}
                >
                  Get Started
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-[#2D9CDB] hover:bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 hover:border-[#2D9CDB]/40 text-sm md:text-base"
                  onClick={() => setIsLearnMoreOpen(true)}
                >
                  Learn More
                </Button>
              </div>
              <Button
                variant="ghost"
                icon={ExternalLink}
                className="text-[#2D9CDB] hover:bg-[#2D9CDB]/10 border border-[#2D9CDB]/20 hover:border-[#2D9CDB]/40 text-sm md:text-base"
                onClick={() => window.open('https://whimsical-ganache-7f13fd.netlify.app', '_blank')}
              >
                D-app Preview
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-8">
          <div id="incubator">
            <Incubator />
          </div>
          <Countdown />
        </div>
        <div className="lg:col-span-1">
          <Leaderboard />
        </div>
      </div>

      <LearnMoreModal
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
      />
    </div>
  );
};