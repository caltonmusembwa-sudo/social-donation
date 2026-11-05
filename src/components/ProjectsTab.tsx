import React from 'react';
import { Sparkles, BookOpen, Utensils, Award, Cpu, ArrowRight, PackageCheck } from 'lucide-react';

interface ProjectsTabProps {
  onPledgeToProject: (tierId: string) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  onPledgeToProject,
}) => {
  const projects = [
    {
      id: 'starter',
      icon: BookOpen,
      category: 'Scholastic Supplies',
      title: 'Scholastic Backpacks & Mathematics Kits',
      tagline: 'Equipping 4,500+ primary & secondary pupils with durable bags, geometric sets, and exercise notebooks.',
      need: 'Without notebooks and pens, children are barred from sitting term examinations.',
      impact: '1 backpack kit provides all learning stationery for an entire academic year.',
      targetGoal: 'Target: 5,000 Student Backpack Kits',
      currentProgress: '4,500 Kits Pledged (90%)',
      accentColor: 'from-amber-600 to-amber-900',
      image: '/assets/aistudio/images__3__245ac07c.jpg',
    },
    {
      id: 'lunch',
      icon: Utensils,
      category: 'Community Feeding',
      title: 'Classroom Mid-Day Nutrition & Hot Porridge',
      tagline: 'Serving 12,000+ warm school lunches so no child tries to learn on an empty stomach.',
      need: 'Over 65% of pupils walk up to 5km to school without morning breakfast.',
      impact: '1 dry food hamper feeds an entire classroom of 30 pupils warm breakfast porridge for a week.',
      targetGoal: 'Target: 25,000 Mid-Day Meals',
      currentProgress: '12,000 Meals Distributed (48%)',
      accentColor: 'from-emerald-700 to-emerald-950',
      image: '/assets/aistudio/images__4__88a8e4c6.jpg',
    },
    {
      id: 'uniform',
      icon: Award,
      category: 'Student Dignity',
      title: 'Uniform Dignity & Athlete Running Shoes',
      tagline: 'Delivering tailored uniforms and sturdy athletic shoes to restore student self-worth.',
      need: 'Children wearing torn clothing frequently drop out out of stigma and embarrassment.',
      impact: '1 clothing pack outfits two children with regulation uniforms, track trainers, and cotton socks.',
      targetGoal: 'Target: 800 Children Equipped',
      currentProgress: '360 Children Outfitted (45%)',
      accentColor: 'from-blue-700 to-slate-900',
      image: '/assets/aistudio/images__1__9b1711cc.jpg',
    },
    {
      id: 'stem',
      icon: Cpu,
      category: 'STEM & Dormitory Support',
      title: 'Student Dormitory & STEM Learning Kits',
      tagline: 'Supplying school boarding facilities with safe bunking and offline interactive science software.',
      need: 'Schools have limited dorm facilities and zero computers, hindering rural boarding students.',
      impact: 'Provides boarding supplies and offline solar-powered learning tablets.',
      targetGoal: 'Target: 50 Bunk Beds & Tablets',
      currentProgress: '24 Units Deployed (48%)',
      accentColor: 'from-purple-700 to-stone-900',
      image: '/assets/aistudio/images_ff349e97.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Active Outreach Campaigns · Term 2026</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Our School Community Projects
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Every programme is designed by the Interact Club of O&amp;U High School with partner school headteachers to collect physical materials for child learning. Zero money or billing involved.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <article
              key={idx}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                {/* Project Image Header with Gradient Overlay */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                        Project 0{idx + 1} · {proj.category}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-white shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {proj.tagline}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                    <div className="p-3 bg-amber-50/80 rounded-xl text-amber-950 border border-amber-200/60">
                      <strong>The Barrier: </strong> {proj.need}
                    </div>
                    <div className="p-3 bg-emerald-50/80 rounded-xl text-emerald-950 border border-emerald-200/60">
                      <strong>Direct Material Impact: </strong> {proj.impact}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold block">{proj.targetGoal}</span>
                    <span className="font-extrabold text-emerald-800 text-sm font-serif">
                      {proj.currentProgress}
                    </span>
                  </div>

                  <button
                    onClick={() => onPledgeToProject(proj.id)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-95 hover:-translate-y-0.5"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Pledge for this Project</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
