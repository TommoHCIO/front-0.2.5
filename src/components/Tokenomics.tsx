import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Star, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

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

export const Tokenomics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#15202B] to-[#192734] p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">Reward System</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Earn $CTE tokens for your social media engagement. The more meaningful your interactions, the greater your rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-[#2D9CDB]/10 p-3 rounded-lg">
              <Coins className="w-6 h-6 text-[#2D9CDB]" />
            </div>
            <h2 className="text-2xl font-bold text-white">How It Works</h2>
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
        </motion.div>
      </div>
    </div>
  );
};