import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Repeat, HelpCircle, ArrowRight } from 'lucide-react';

export const QuickActionCards: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Start Adaptive Practice',
      desc: 'Jump into questions that adapt to your speed and difficulty level in real time.',
      icon: Dumbbell,
      path: '/practice?concept=c-frac-1',
      bgGradient: 'from-indigo-600 to-violet-600',
      iconBg: 'bg-white/20 text-white',
      btnText: 'Start Now',
    },
    {
      title: 'Revise Weak Concepts',
      desc: 'Review questions you previously struggled with and solidify your foundation.',
      icon: Repeat,
      path: '/revision',
      bgGradient: 'from-teal-600 to-emerald-600',
      iconBg: 'bg-white/20 text-white',
      btnText: 'Revise List',
    },
    {
      title: 'Ask a Doubt',
      desc: 'Stuck on a problem? Post a question and get personalized guidance from Dr. Sunita.',
      icon: HelpCircle,
      path: '/doubts',
      bgGradient: 'from-purple-600 to-pink-600',
      iconBg: 'bg-white/20 text-white',
      btnText: 'Ask Doubt',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
      {actions.map((act, idx) => {
        const Icon = act.icon;
        return (
          <div
            key={idx}
            onClick={() => navigate(act.path)}
            className={`p-6 rounded-3xl bg-gradient-to-br ${act.bgGradient} text-white shadow-xl cursor-pointer hover:scale-102 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group`}
          >
            <div>
              <div className={`w-12 h-12 rounded-2xl ${act.iconBg} flex items-center justify-center mb-4 backdrop-blur-md shadow-inner`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold tracking-tight mb-1">
                {act.title}
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                {act.desc}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs font-bold pt-3 border-t border-white/20">
              <span>{act.btnText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
