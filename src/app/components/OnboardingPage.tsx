import { useState } from 'react';
import { Heart, Target, Calendar, Sun, Check } from 'lucide-react';
import { Goal, Task, LifeGoal } from '../types';

interface OnboardingPageProps {
  lifeGoals: LifeGoal[];
  goals: Goal[];
  tasks: Task[];
  onNavigate: (view: 'life-goals' | 'overview' | 'weekly' | 'today') => void;
}

export function OnboardingPage({ lifeGoals, goals, tasks, onNavigate }: OnboardingPageProps) {
  const step1Done = lifeGoals.length > 0;
  const step2Done = goals.length > 0;
  const step3Done = tasks.length > 0;

  const steps = [
    {
      num: 1,
      title: 'Define your life goals',
      desc: 'What are the big areas of life you want to invest in? Health, family, finances, growth. Up to 5.',
      cta: 'Set life goals',
      view: 'life-goals' as const,
      done: step1Done,
      count: step1Done ? `${lifeGoals.length} created` : undefined,
    },
    {
      num: 2,
      title: 'Create a yearly goal',
      desc: 'Pick something measurable for this year, linked to a life goal. E.g. "Reach 90 kg by December."',
      cta: 'Create yearly goal',
      view: 'overview' as const,
      done: step2Done,
      count: step2Done ? `${goals.length} created` : undefined,
    },
    {
      num: 3,
      title: 'Add a weekly task',
      desc: 'What will you do each week to hit that goal? E.g. "Log daily steps — 10,000 per day."',
      cta: 'Add a task',
      view: 'weekly' as const,
      done: step3Done,
      count: step3Done ? `${tasks.length} created` : undefined,
    },
    {
      num: 4,
      title: 'Start logging on Today',
      desc: 'Once your task is set up, Today becomes your daily dashboard. Log and build your streak.',
      cta: 'Go to Today',
      view: 'today' as const,
      done: step3Done,
      count: undefined,
    },
  ];

  const currentStep = step1Done ? (step2Done ? (step3Done ? 4 : 3) : 2) : 1;
  const title = currentStep === 1 ? 'Welcome to Gritio' : 'Good progress!';
  const subtitle = currentStep === 1
    ? 'Everything connects — set up in order and your daily tasks will make sense.'
    : `${currentStep - 1} of 4 steps done — next up: ${steps[currentStep - 1].title.toLowerCase()}.`;

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1009] mb-2">{title}</h1>
        <p className="text-sm text-[#7a6a5a]">{subtitle}</p>
      </div>

      {/* Hierarchy Chain */}
      <div className="mb-8 bg-white border border-[rgba(0,0,0,0.08)] rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max md:min-w-0">
          {/* Life Goals */}
          <div
            className={`flex-1 text-center py-3 px-4 rounded-l-lg border border-r-0 border-[rgba(0,0,0,0.08)] transition-all ${
              currentStep >= 1
                ? currentStep === 1
                  ? 'bg-[#805232] text-white'
                  : 'bg-[#f0e8d4] text-[#1a6b52]'
                : 'bg-white text-[#b0a090]'
            }`}
          >
            <div className="text-xl mb-1">
              {currentStep > 1 ? <Check className="w-5 h-5 mx-auto" /> : <Heart className="w-5 h-5 mx-auto" />}
            </div>
            <div className={`text-xs font-semibold ${currentStep > 1 ? 'line-through' : ''}`}>Life goals</div>
            <div className="text-xs opacity-70">Your why</div>
          </div>

          {/* Arrow 1 */}
          <div className={`px-2 text-xs ${currentStep > 1 ? 'text-[#f0e8d4]' : 'text-[rgba(0,0,0,0.1)]'}`}>→</div>

          {/* Yearly Goals */}
          <div
            className={`flex-1 text-center py-3 px-4 border border-r-0 border-[rgba(0,0,0,0.08)] transition-all ${
              currentStep >= 2
                ? currentStep === 2
                  ? 'bg-[#805232] text-white'
                  : 'bg-[#f0e8d4] text-[#1a6b52]'
                : 'bg-white text-[#b0a090]'
            }`}
          >
            <div className="text-xl mb-1">
              {currentStep > 2 ? <Check className="w-5 h-5 mx-auto" /> : <Target className="w-5 h-5 mx-auto" />}
            </div>
            <div className={`text-xs font-semibold ${currentStep > 2 ? 'line-through' : ''}`}>Yearly goals</div>
            <div className="text-xs opacity-70">What this year</div>
          </div>

          {/* Arrow 2 */}
          <div className={`px-2 text-xs ${currentStep > 2 ? 'text-[#f0e8d4]' : 'text-[rgba(0,0,0,0.1)]'}`}>→</div>

          {/* Weekly Tasks */}
          <div
            className={`flex-1 text-center py-3 px-4 border border-r-0 border-[rgba(0,0,0,0.08)] transition-all ${
              currentStep >= 3
                ? currentStep === 3
                  ? 'bg-[#805232] text-white'
                  : 'bg-[#f0e8d4] text-[#1a6b52]'
                : 'bg-white text-[#b0a090]'
            }`}
          >
            <div className="text-xl mb-1">
              {currentStep > 3 ? <Check className="w-5 h-5 mx-auto" /> : <Calendar className="w-5 h-5 mx-auto" />}
            </div>
            <div className={`text-xs font-semibold ${currentStep > 3 ? 'line-through' : ''}`}>Weekly tasks</div>
            <div className="text-xs opacity-70">How to get there</div>
          </div>

          {/* Arrow 3 */}
          <div className={`px-2 text-xs ${currentStep > 3 ? 'text-[#f0e8d4]' : 'text-[rgba(0,0,0,0.1)]'}`}>→</div>

          {/* Today */}
          <div
            className={`flex-1 text-center py-3 px-4 rounded-r-lg border border-[rgba(0,0,0,0.08)] transition-all ${
              currentStep >= 4
                ? currentStep === 4
                  ? 'bg-[#805232] text-white'
                  : 'bg-[#f0e8d4] text-[#1a6b52]'
                : 'bg-white text-[#b0a090]'
            }`}
          >
            <div className="text-xl mb-1">
              {currentStep > 4 ? <Check className="w-5 h-5 mx-auto" /> : <Sun className="w-5 h-5 mx-auto" />}
            </div>
            <div className={`text-xs font-semibold ${currentStep > 4 ? 'line-through' : ''}`}>Today</div>
            <div className="text-xs opacity-70">Log & track</div>
          </div>
        </div>
      </div>

      {/* Steps Checklist */}
      <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-xl overflow-hidden">
        {steps.map((step, idx) => {
          const isActive = step.num === currentStep;
          const isDone = step.done;

          return (
            <div
              key={step.num}
              className={`flex gap-4 p-4 border-b border-[rgba(0,0,0,0.07)] last:border-b-0 transition-opacity ${
                !isActive && !isDone ? 'opacity-45' : ''
              }`}
            >
              {/* Step Number Circle */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isDone
                    ? 'bg-[#e6f5ef] text-[#1a6b52]'
                    : isActive
                    ? 'bg-[#805232] text-white'
                    : 'bg-[#ede8e2] text-[#7a6a5a]'
                }`}
              >
                {isDone ? <Check className="w-4 h-4" /> : step.num}
              </div>

              {/* Step Body */}
              <div className="flex-1">
                <h3
                  className={`font-semibold mb-1 ${
                    isDone ? 'text-[#7a6a5a] line-through' : 'text-[#1a1009]'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-[#7a6a5a] mb-3 leading-relaxed">{step.desc}</p>
                {isDone && step.count && (
                  <p className="text-xs text-[#7a6a5a]">{step.count}</p>
                )}
                {isActive && (
                  <button
                    onClick={() => onNavigate(step.view)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-[#805232] text-white text-xs font-semibold rounded-md hover:bg-[#6b4427] transition-colors"
                  >
                    {step.num === 1 && <Heart className="w-3 h-3" />}
                    {step.num === 2 && <Target className="w-3 h-3" />}
                    {step.num === 3 && <Calendar className="w-3 h-3" />}
                    {step.num === 4 && <Sun className="w-3 h-3" />}
                    {step.cta}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
