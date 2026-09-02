import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Stethoscope, 
  Calendar, 
  Award, 
  Building2, 
  FileText, 
  BookOpen, 
  Target, 
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TabType } from '../Navbar';
import { CAREER_PATHWAYS } from '../../data/careerPathways';

interface DashboardViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab }) => {
  const { 
    profile, 
    readinessScore, 
    finalFive, 
    timelineTasks, 
    colleges, 
    finalFiveCompletionPercent 
  } = useApp();

  const careerInfo = CAREER_PATHWAYS[profile.careerGoal] || CAREER_PATHWAYS.crna;
  
  // Pending tasks for Junior Year
  const pendingJuniorTasks = timelineTasks
    .filter(t => !t.completed && (t.gradeLevel.includes('Junior') || t.gradeLevel.includes('Summer')))
    .slice(0, 4);

  // Safety / Target / Reach breakdown in Final 5
  const safetyCount = finalFive.filter(f => f.category === 'Safety').length;
  const targetCount = finalFive.filter(f => f.category === 'Target').length;
  const reachCount = finalFive.filter(f => f.category === 'Reach').length;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute -right-10 -top-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 bottom-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>Junior Year (11th Grade) College Admissions Launchpad</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Hi {profile.fullName || 'there'}, let's build your standout application package.
          </h1>
          
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Junior year is the turning point. We’ll take you from <span className="text-white font-semibold">"I don’t know where to begin"</span> to a polished <span className="text-brand-300 font-semibold">Final 5 College Application Package</span> with high-impact SAT scores, clinical shadowing hours, and a ready-to-submit resume.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('colleges')}
              className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold flex items-center space-x-2 shadow-lg shadow-brand-500/30 transition-all"
            >
              <span>Match Colleges for Pre-Med / CRNA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('career_pathways')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Compare MD vs CRNA Pathways</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Key Holistic Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* GPA & Course Rigor */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Rigor</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{profile.unweightedGpa.toFixed(2)}</span>
              <span className="text-xs font-semibold text-slate-500">Unweighted</span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center space-x-1.5">
              <span className="font-semibold text-brand-600">{profile.weightedGpa.toFixed(2)} W-GPA</span>
              <span>•</span>
              <span>{profile.apIbCoursesCount} AP/IB classes</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('profile')}
            className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
          >
            <span>Edit GPA & APs</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* SAT / Standardized Testing */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Standardized Tests</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-slate-900">{profile.satScore || 'Not Taken'}</span>
              <span className="text-xs font-semibold text-slate-500">Current SAT</span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center space-x-1.5">
              <span>Target: <strong className="text-indigo-600">{profile.targetSatScore || '1450+'}</strong></span>
              {profile.psatScore && (
                <>
                  <span>•</span>
                  <span>PSAT: {profile.psatScore}</span>
                </>
              )}
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('timeline')}
            className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
          >
            <span>View Test Dates</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Clinical Shadowing & Volunteering */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical & Service</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-emerald-700">{profile.clinicalHours}h</span>
              <span className="text-xs font-semibold text-slate-500">Clinical Shadowing</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              <span>+ {profile.communityServiceHours}h Community Service</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('profile')}
            className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>Log Clinical Shifts</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Final 5 Package Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Final Application List</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-purple-700">{finalFive.length} / 5</span>
              <span className="text-xs font-semibold text-slate-500">Colleges Picked</span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center space-x-2">
              <span className="text-emerald-600 font-bold">{safetyCount} Safe</span>
              <span>•</span>
              <span className="text-blue-600 font-bold">{targetCount} Target</span>
              <span>•</span>
              <span className="text-rose-600 font-bold">{reachCount} Reach</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('final_five')}
            className="mt-4 text-xs font-semibold text-purple-600 hover:text-purple-700 flex items-center space-x-1"
          >
            <span>Open Application Package</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main 2-Column Split: Career Track Spotlight + Junior Year Priorities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Career Track & Final 5 Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Career Track Focus Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Active Career Trajectory</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{careerInfo.title}</h3>
              </div>
              <button
                onClick={() => setActiveTab('career_pathways')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-1.5 self-start sm:self-auto transition-colors"
              >
                <span>Switch / Compare Tracks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {careerInfo.roleDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block">Avg Compensation</span>
                <span className="text-sm font-extrabold text-emerald-700 mt-0.5 block">{careerInfo.averageSalary}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block">Total Training Time</span>
                <span className="text-sm font-extrabold text-slate-800 mt-0.5 block">{careerInfo.totalYearsAfterHighSchool}</span>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-[11px] font-semibold text-slate-400 block">High School Strategy</span>
                <span className="text-xs font-bold text-brand-700 mt-0.5 block">
                  {profile.careerGoal === 'crna' ? 'Direct-Entry BSN Focus' : 'Pre-Med / Biology Focus'}
                </span>
              </div>
            </div>

            {/* High School Junior Milestone Alert */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start space-x-3">
              <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900">What to do in Junior Year for this track:</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  {careerInfo.stages[0]?.criticalJuniorHighSchoolPrep || 'Excel in AP Chemistry & AP Biology, take the spring SAT/ACT, and log hospital shadowing.'}
                </p>
              </div>
            </div>
          </div>

          {/* Final 5 Application Package Snapshot */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Application Command Center</span>
                <h3 className="text-xl font-bold text-slate-900">Final 5 College Applications</h3>
              </div>
              <button
                onClick={() => setActiveTab('final_five')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>Manage Checklists</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {finalFive.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No colleges in your Final 5 yet</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Browse our curated Pre-Med and Direct-Entry BSN college matcher to select 5 balanced schools.
                </p>
                <button
                  onClick={() => setActiveTab('colleges')}
                  className="mt-3 px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700"
                >
                  Explore College Matcher
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {finalFive.map(item => {
                  const college = colleges.find(c => c.id === item.collegeId);
                  if (!college) return null;
                  const progress = finalFiveCompletionPercent(item.collegeId);

                  return (
                    <div 
                      key={item.collegeId}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-xs text-brand-700 shadow-sm shrink-0">
                          {college.shortName ? college.shortName.substring(0, 3).toUpperCase() : 'COL'}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-bold text-slate-900">{college.name}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              item.category === 'Safety' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : item.category === 'Target'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.targetMajor} • {item.applicationType} Deadline: {college.deadlines.earlyAction || college.deadlines.regularDecision}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="w-full sm:w-32">
                          <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                            <span>Ready</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 rounded-full ${
                                progress === 100 ? 'bg-emerald-500' : progress > 50 ? 'bg-indigo-500' : 'bg-brand-500'
                              }`} 
                              style={{ width: `${progress}%` }} 
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveTab('final_five')}
                          className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shrink-0 transition-colors"
                        >
                          Checklist
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Next Up Timeline Action Items + Tools Launcher */}
        <div className="space-y-6">
          
          {/* Next Up Junior Tasks */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-brand-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Next Up: Junior Year</h3>
              </div>
              <button
                onClick={() => setActiveTab('timeline')}
                className="text-xs font-semibold text-brand-600 hover:text-brand-800"
              >
                View Full Timeline
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {pendingJuniorTasks.map(task => (
                <div 
                  key={task.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/80 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2 py-0.5 rounded">
                      {task.targetMonth}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${task.priority === 'high' ? 'text-rose-600' : 'text-slate-500'}`}>
                      {task.priority} priority
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">{task.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{task.description}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('timeline')}
              className="mt-4 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors text-center"
            >
              Open Full Month-by-Month Roadmap
            </button>
          </div>

          {/* Quick Toolkit Shortcuts */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-300">Admissions Toolkit</h3>
            <p className="text-xs text-slate-300 mt-1">Jump directly into specialized junior preparation tools:</p>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => setActiveTab('resume')}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Counselor Brag Sheet & Resume</h4>
                    <p className="text-[11px] text-slate-300">Generate formatted brag sheet for teacher recs</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('essays')}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Common App Essay Studio</h4>
                    <p className="text-[11px] text-slate-300">7 prompts, pre-med brainstorming, drafting</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => setActiveTab('campus_visits')}
                className="w-full p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-between text-left transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Campus Visit Scorecard</h4>
                    <p className="text-[11px] text-slate-300">Score dorms, simulation labs & pre-med vibe</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
