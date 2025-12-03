'use client';

import { useState } from 'react';
import { OnboardingModal } from '@/components/onboarding';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Shield, Zap } from 'lucide-react';

export default function OnboardingPage() {
  const [showModal, setShowModal] = useState(true);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Safety First',
      description: 'Prevent cash-flow gaps before they happen',
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Debt Elimination',
      description: 'Snowball your way to financial freedom',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Smart Advisor',
      description: 'Personalized guidance for your situation',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Welcome to FinCommand
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Take control of your finances with safety-first planning, debt elimination strategies,
            and personalized financial advice.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 bg-emerald-50 rounded-lg text-emerald-600 w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-slate-600 mb-6">
            Click the button above to complete your setup in just a few minutes.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-bold text-lg hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            Start Setup
          </motion.button>
        </motion.div>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showModal}
        onComplete={(data) => {
          console.log('Onboarding complete:', data);
          setShowModal(false);
          // In a real app, save this data and redirect
          window.location.href = '/dashboard';
        }}
        onSkip={() => {
          setShowModal(false);
          window.location.href = '/dashboard';
        }}
      />
    </div>
  );
}
