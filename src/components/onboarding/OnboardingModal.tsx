'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Wallet, DollarSign, CreditCard, Zap } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: Array<{
    name: string;
    label: string;
    type: 'number' | 'text';
    placeholder: string;
  }>;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'savings',
    title: 'Current Savings',
    description: 'How much do you have in liquid savings (checking/savings accounts)?',
    icon: <Wallet className="h-8 w-8" />,
    fields: [
      {
        name: 'currentBalance',
        label: 'Available Balance',
        type: 'number',
        placeholder: '5,000',
      },
    ],
  },
  {
    id: 'income',
    title: 'Monthly Income',
    description: 'What is your total monthly take-home income?',
    icon: <DollarSign className="h-8 w-8" />,
    fields: [
      {
        name: 'monthlyIncome',
        label: 'Monthly Take-Home',
        type: 'number',
        placeholder: '3,500',
      },
    ],
  },
  {
    id: 'expenses',
    title: 'Monthly Expenses',
    description: 'What are your typical monthly expenses (rent, food, utilities, etc)?',
    icon: <CreditCard className="h-8 w-8" />,
    fields: [
      {
        name: 'monthlyExpenses',
        label: 'Total Monthly Expenses',
        type: 'number',
        placeholder: '1,800',
      },
    ],
  },
  {
    id: 'debt',
    title: 'Debt Overview',
    description: 'Do you have any debt? (We&apos;ll help you create a payoff strategy)',
    icon: <Zap className="h-8 w-8" />,
    fields: [
      {
        name: 'hasDebt',
        label: 'Do you have outstanding debt?',
        type: 'text',
        placeholder: 'Yes or No',
      },
    ],
  },
];

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete?: (data: Record<string, string | number>) => void;
  onSkip?: () => void;
}

export function OnboardingModal({ isOpen, onComplete, onSkip }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string | number>>({});

  const step = ONBOARDING_STEPS[currentStep];
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100;
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1;

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.(formData);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isCurrentStepValid = () => {
    return step.fields.every((field) => formData[field.name]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Let&apos;s Get Started</h2>
              <button
                onClick={onSkip}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                Skip
              </button>
            </div>
            <p className="text-slate-300 mb-4">
              {ONBOARDING_STEPS.length} quick questions to set up FinCommand
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </p>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-slate-100 rounded-full text-slate-900">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title & Description */}
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-center mb-8">{step.description}</p>

                {/* Form Fields */}
                <div className="space-y-4">
                  {step.fields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                {/* Helpful Hints */}
                <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-700">
                    <span className="font-semibold">💡 Tip:</span> These numbers help us calculate your
                    debt payoff timeline, emergency fund goal, and wealth potential.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 flex gap-3 justify-between bg-slate-50">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 text-slate-700 bg-slate-100 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              {isLastStep ? (
                <>
                  <Check className="h-4 w-4" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
