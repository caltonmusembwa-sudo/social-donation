import React from 'react';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { Trophy, School, ArrowRight, PlusCircle, Users, CheckCircle2, PackageCheck } from 'lucide-react';

interface SchoolLeaderboardProps {
  schools: SchoolLeaderboardEntry[];
  onRegisterSchoolClick: () => void;
  onPledgeToSchool: (schoolName: string) => void;
}

export const SchoolLeaderboard: React.FC<SchoolLeaderboardProps> = ({
  schools,
  onRegisterSchoolClick,
  onPledgeToSchool,
}) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-xl" title="1st Place">🥇</span>;
      case 2:
        return <span className="text-xl" title="2nd Place">🥈</span>;
      case 3:
        return <span className="text-xl" title="3rd Place">🥉</span>;
      default:
        return (
          <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center">
            {rank}
          </span>
        );
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Friendly Community School League</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 font-serif">
              Is Your School Leading the Charge?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Track the physical student backpacks, nutritious lunches, and uniforms pledged across our 18 partner schools. Zero money involved—100% material supplies.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onRegisterSchoolClick}
            className="self-start md:self-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Register Your Child’s School or PTA</span>
          </button>
        </div>

        {/* Dynamic Leaderboard Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Current Rank</th>
                  <th className="py-3.5 px-4 sm:px-6">School Name</th>
                  <th className="py-3.5 px-4 sm:px-6">Goal Progress</th>
                  <th className="py-3.5 px-4 sm:px-6">Supplies Pledged</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {schools.map((school) => {
                  return (
                    <tr
                      key={school.id}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRankBadge(school.rank)}
                          <span className="font-semibold text-stone-700 text-xs sm:text-sm">
                            {school.rank === 1 ? '1st Place' : school.rank === 2 ? '2nd Place' : school.rank === 3 ? '3rd Place' : `${school.rank}th Place`}
                          </span>
                        </div>
                      </td>

                      {/* School Name & Level */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-stone-900 text-sm sm:text-base">
                          {school.name}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                          <span>{school.level}</span>
                          <span aria-hidden="true">·</span>
                          <span>{school.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-medium">
                            {school.studentsSupported} pupils assisted
                          </span>
                        </div>
                      </td>

                      {/* Progress Bar & Percentage */}
                      <td className="py-4 px-4 sm:px-6 min-w-[180px]">
                        <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
                          <span className="text-emerald-700 font-mono">
                            {school.progressPercent}%
                          </span>
                          <span className="text-[11px] text-stone-400 font-normal">
                            Target: {school.targetCount} Kits
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              school.progressPercent >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, school.progressPercent)}%` }}
                          />
                        </div>
                      </td>

                      {/* Supplies Pledged */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="font-extrabold text-stone-900 text-sm sm:text-base font-serif flex items-center gap-1.5">
                          <PackageCheck className="w-4 h-4 text-emerald-600" />
                          <span>{school.itemsPledgedCount} Pledged</span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {school.metricLabel}
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => onPledgeToSchool(school.name)}
                          className="inline-flex items-center gap-1 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 hover:border-amber-600 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs hover:text-amber-800 hover:-translate-y-0.5"
                        >
                          <span>Pledge Supplies</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Leaderboard updates in real-time as community supply commitments are received.</span>
            </span>
            <button
              onClick={onRegisterSchoolClick}
              className="text-amber-800 font-semibold hover:underline"
            >
              Want your school listed? Enroll a new school drive →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
