import React from 'react';
import { X, Target, Shield, Users, Globe, Coins, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  {
    icon: Target,
    title: 'Our Vision',
    description: 'To revolutionize social media by creating a decentralized ecosystem where every interaction has real value.'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built on Solana blockchain with enterprise-grade security measures to ensure safe and transparent transactions.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: "Governed by our community members, ensuring that every voice matters in shaping the platform's future."
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Breaking down geographical barriers to connect and reward users worldwide.'
  }
];

const milestones = [
  {
    year: '2024 Q1',
    title: 'Platform Launch',
    description: 'Successfully launched the Chat to Earn platform with core features.'
  },
  {
    year: '2024 Q2',
    title: 'Token Integration',
    description: 'Implementation of $CTE token and reward distribution system.'
  },
  {
    year: '2024 Q3',
    title: 'Mobile App',
    description: 'Launch of iOS and Android applications for enhanced accessibility.'
  }
];

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
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
            className="relative w-full max-w-4xl bg-[#1a2634] border border-white/10 rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="space-y-8">
              {/* Header Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2D9CDB] to-[#7F56D9] bg-clip-text text-transparent mb-4">
                  About Chat to Earn
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  We're building the future of social engagement where meaningful interactions are valued and rewarded through blockchain technology.
                </p>
              </div>

              {/* Mission Statement */}
              <div className="bg-gradient-to-br from-[#2D9CDB]/10 to-transparent p-6 rounded-xl border border-[#2D9CDB]/20">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-[#2D9CDB]" />
                  <h3 className="text-xl font-semibold text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  To create a sustainable ecosystem where content creators and engaged users are fairly rewarded for their contributions to meaningful online discussions. We believe in the power of community-driven growth and the potential of blockchain technology to revolutionize social media interaction.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tokenomics Section */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Coins className="w-6 h-6 text-[#2D9CDB]" />
                  <h3 className="text-xl font-semibold text-white">Tokenomics</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    The $CTE token is the backbone of our ecosystem, designed with a focus on sustainability and long-term value creation:
                  </p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#2D9CDB] rounded-full" />
                      <span>Total Supply: 1,000,000 $CTE</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#2D9CDB] rounded-full" />
                      <span>30% allocated for community rewards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#2D9CDB] rounded-full" />
                      <span>20% reserved for development and marketing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#2D9CDB] rounded-full" />
                      <span>50% locked for future ecosystem growth</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Key Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-white/5 p-4 rounded-lg border border-white/10"
                    >
                      <div className="bg-[#2D9CDB]/10 px-3 py-1 rounded text-sm font-medium text-[#2D9CDB]">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-1">{milestone.title}</h4>
                        <p className="text-sm text-gray-400">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Team Values */}
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We believe in transparency, community empowerment, and sustainable growth. Our platform is built on the principles of fair reward distribution and meaningful engagement, ensuring that every participant benefits from their contributions to the ecosystem.
                  </p>
                  <p>
                    Join us in revolutionizing social media engagement and be part of a community that values authentic interactions and rewards meaningful contributions.
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