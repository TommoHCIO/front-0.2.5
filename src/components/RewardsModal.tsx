import React from 'react';
import { X, Star, ThumbsUp, MessageCircle, Share2, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rewardItems = [
  {
    icon: Star,
    title: 'Views',
    reward: '+1 $CTE',
    description: 'Earn tokens when your posts get views',
  },
  {
    icon: ThumbsUp,
    title: 'Likes',
    reward: '+2 $CTE',
    description: 'Get rewarded when users like your content',
  },
  {
    icon: MessageCircle,
    title: 'Comments',
    reward: '+5 $CTE',
    description: 'Earn more for engaging discussions',
  },
  {
    icon: Share2,
    title: 'Reposts',
    reward: '+10 $CTE',
    description: 'Maximum rewards for content sharing',
  },
];

export const RewardsModal: React.FC<RewardsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#1a2634] border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#2D9CDB] mb-2">Reward System</h2>
                <p className="text-gray-300">
                  Earn $CTE tokens for your social media engagement. The more meaningful your interactions, the greater your rewards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rewardItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#2D9CDB]/10 p-3 rounded-lg">
                        <item.icon className="w-6 h-6 text-[#2D9CDB]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                        <p className="text-2xl font-bold text-[#2D9CDB] mb-2">{item.reward}</p>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-[#2D9CDB]/10 p-3 rounded-lg">
                    <Coins className="w-6 h-6 text-[#2D9CDB]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">How It Works</h3>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="text-justify">
                    Our reward system is designed to incentivize quality content and meaningful engagement. 
                    Each interaction is tracked and verified through blockchain technology, ensuring 
                    transparent and fair distribution of rewards.
                  </p>
                  <p className="text-justify">
                    Rewards are distributed in real-time as you engage with the platform. The more value 
                    you bring to the community through your content and interactions, the more tokens 
                    you can earn.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};