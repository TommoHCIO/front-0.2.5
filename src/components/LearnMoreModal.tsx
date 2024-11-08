import React from 'react';
import { X, Star, ThumbsUp, MessageCircle, Share2, Target, Shield, Coins, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize social media engagement by creating a sustainable ecosystem where meaningful interactions are valued and rewarded.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Built on Solana blockchain technology, ensuring transparent and secure reward distribution.'
    },
    {
      icon: Coins,
      title: 'Tokenomics',
      description: 'Total supply of 1,000,000 CTE tokens with 30% allocated for community rewards through the incubator program.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a vibrant community of content creators and engaged users who contribute to meaningful discussions.'
    }
  ];

  const rewards = [
    {
      icon: Star,
      action: 'Views',
      amount: '+1 CTE',
      description: 'Earn tokens when your posts get views'
    },
    {
      icon: ThumbsUp,
      action: 'Likes',
      amount: '+2 CTE',
      description: 'Receive rewards for likes on your content'
    },
    {
      icon: MessageCircle,
      action: 'Comments',
      amount: '+5 CTE',
      description: 'Earn more for engaging discussions'
    },
    {
      icon: Share2,
      action: 'Reposts',
      amount: '+10 CTE',
      description: 'Maximum rewards for content sharing'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4 py-8">
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
            className="relative w-full max-w-4xl bg-gradient-to-br from-[#1E2A37]/80 to-[#1E2A37]/50 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D9CDB]/5 to-transparent pointer-events-none" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="relative p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] bg-clip-text text-transparent mb-4">
                  About Chat to Earn
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  A revolutionary platform that rewards users for meaningful social media engagement while building a vibrant community.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#2D9CDB]/10 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-[#2D9CDB]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Rewards Section */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Reward System</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {rewards.map((reward, index) => (
                    <motion.div
                      key={reward.action}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center"
                    >
                      <div className="bg-[#2D9CDB]/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <reward.icon className="w-6 h-6 text-[#2D9CDB]" />
                      </div>
                      <div className="text-2xl font-bold text-[#2D9CDB] mb-2">{reward.amount}</div>
                      <div className="text-white mb-1">{reward.action}</div>
                      <div className="text-sm text-gray-400">{reward.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Chat to Earn uses advanced blockchain technology to track and reward social media engagement. 
                    Users earn CTE tokens for various interactions, with rewards distributed automatically and transparently.
                  </p>
                  <p>
                    The incubator program allows early supporters to participate in the initial token distribution, 
                    receiving rewards proportional to their contribution while helping build a strong foundation for the platform.
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