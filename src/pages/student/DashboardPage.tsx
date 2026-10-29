import React from 'react';
import { DashboardHero } from '../../components/student/DashboardHero';
import { ContinueLearningCard } from '../../components/student/ContinueLearningCard';
import { SubjectCard } from '../../components/student/SubjectCard';
import { ClassRankCard } from '../../components/student/ClassRankCard';
import { MonthlyAssessmentChart } from '../../components/student/MonthlyAssessmentChart';
import { ExamAlertsCard } from '../../components/student/ExamAlertsCard';
import { DailyGoalsBadges } from '../../components/student/DailyGoalsBadges';
import { QuickActionCards } from '../../components/student/QuickActionCards';
import { MOCK_SUBJECTS } from '../../data/mockData';

export const DashboardPage: React.FC = () => {
  return (
    <div className="w-full space-y-6 select-none animate-fade-in">
      {/* 1. Greeting Hero with Mascot and Metrics */}
      <DashboardHero />

      {/* 2. Urgent Exam Alert & Continue Where You Left Off */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <ContinueLearningCard />
          
          {/* Subjects Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                Your Enrolled Subjects
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                6 Active • Class 8
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MOCK_SUBJECTS.map((subject) => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Exam Countdown Alert Card */}
        <div className="lg:col-span-1">
          <ExamAlertsCard />
        </div>
      </div>

      {/* 3. Progress Trajectory & Class Standings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyAssessmentChart />
        <ClassRankCard />
      </div>

      {/* 4. Daily Goals & Achievements */}
      <DailyGoalsBadges />

      {/* 5. Bottom Quick Action Cards */}
      <QuickActionCards />
    </div>
  );
};
