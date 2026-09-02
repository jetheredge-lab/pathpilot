import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  TrendingUp, 
  Award, 
  HeartPulse, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  Sparkles, 
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivityItem, AwardItem, CareerGoal } from '../../types';
import { Modal } from '../common/Modal';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, readinessScore } = useApp();

  // Activity Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivityId, setEditingActivityId] = useState<string | null>(null);
  const [actTitle, setActTitle] = useState('');
  const [actOrg, setActOrg] = useState('');
  const [actCategory, setActCategory] = useState<ActivityItem['category']>('clinical');
  const [actRole, setActRole] = useState('');
  const [actGrades, setActGrades] = useState<string[]>(['11th']);
  const [actHoursPerWeek, setActHoursPerWeek] = useState(4);
  const [actWeeksPerYear, setActWeeksPerYear] = useState(30);
  const [actDescription, setActDescription] = useState('');
  const [actHighlights, setActHighlights] = useState('');

  // Award Modal State
  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [awardTitle, setAwardTitle] = useState('');
  const [awardLevel, setAwardLevel] = useState<AwardItem['level']>('State');
  const [awardGrade, setAwardGrade] = useState('11th');
  const [awardDesc, setAwardDesc] = useState('');

  // New AP Course input
  const [newApCourse, setNewApCourse] = useState('');

  const handleOpenNewActivity = () => {
    setEditingActivityId(null);
    setActTitle('');
    setActOrg('');
    setActCategory('clinical');
    setActRole('');
    setActGrades(['11th']);
    setActHoursPerWeek(4);
    setActWeeksPerYear(30);
    setActDescription('');
    setActHighlights('');
    setIsActivityModalOpen(true);
  };

  const handleEditActivity = (act: ActivityItem) => {
    setEditingActivityId(act.id);
    setActTitle(act.title);
    setActOrg(act.organization);
    setActCategory(act.category);
    setActRole(act.roles);
    setActGrades(act.grades);
    setActHoursPerWeek(act.hoursPerWeek);
    setActWeeksPerYear(act.weeksPerYear);
    setActDescription(act.description);
    setActHighlights(act.highlights);
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const totalHours = actHoursPerWeek * actWeeksPerYear;
    const newAct: ActivityItem = {
      id: editingActivityId || `act_${Date.now()}`,
      title: actTitle,
      organization: actOrg,
      category: actCategory,
      roles: actRole,
      grades: actGrades,
      hoursPerWeek: Number(actHoursPerWeek),
      weeksPerYear: Number(actWeeksPerYear),
      totalHours,
      description: actDescription,
      highlights: actHighlights
    };

    let updatedList = [...profile.extracurriculars];
    if (editingActivityId) {
      updatedList = updatedList.map(a => a.id === editingActivityId ? newAct : a);
    } else {
      updatedList = [newAct, ...updatedList];
    }

    // Auto calculate clinical and community service hours
    const totalClinical = updatedList
      .filter(a => a.category === 'clinical')
      .reduce((sum, a) => sum + (a.totalHours || 0), 0);
    const totalVol = updatedList
      .filter(a => a.category === 'volunteering')
      .reduce((sum, a) => sum + (a.totalHours || 0), 0);

    updateProfile({
      extracurriculars: updatedList,
      clinicalHours: totalClinical,
      communityServiceHours: totalVol
    });

    setIsActivityModalOpen(false);
  };

  const handleDeleteActivity = (id: string) => {
    const updatedList = profile.extracurriculars.filter(a => a.id !== id);
    const totalClinical = updatedList
      .filter(a => a.category === 'clinical')
      .reduce((sum, a) => sum + (a.totalHours || 0), 0);
    const totalVol = updatedList
      .filter(a => a.category === 'volunteering')
      .reduce((sum, a) => sum + (a.totalHours || 0), 0);

    updateProfile({
      extracurriculars: updatedList,
      clinicalHours: totalClinical,
      communityServiceHours: totalVol
    });
  };

  const handleSaveAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardTitle.trim()) return;

    const newAward: AwardItem = {
      id: `aw_${Date.now()}`,
      title: awardTitle,
      level: awardLevel,
      gradeReceived: awardGrade,
      description: awardDesc
    };

    updateProfile({
      awards: [newAward, ...profile.awards]
    });

    setAwardTitle('');
    setAwardDesc('');
    setIsAwardModalOpen(false);
  };

  const handleDeleteAward = (id: string) => {
    updateProfile({
      awards: profile.awards.filter(a => a.id !== id)
    });
  };

  const handleAddApCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApCourse.trim()) return;
    const current = profile.apCourses || [];
    if (!current.includes(newApCourse.trim())) {
      updateProfile({
        apCourses: [...current, newApCourse.trim()],
        apIbCoursesCount: (profile.apIbCoursesCount || 0) + 1
      });
    }
    setNewApCourse('');
  };

  const handleRemoveApCourse = (course: string) => {
    updateProfile({
      apCourses: (profile.apCourses || []).filter(c => c !== course),
      apIbCoursesCount: Math.max(0, (profile.apIbCoursesCount || 1) - 1)
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-semibold mb-2">
              <User className="w-3.5 h-3.5 text-brand-600" />
              <span>Student Holistic Admissions Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {profile.fullName || 'Student'} Portfolio & Clinical Ledger
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Keep your GPA, standardized test scores, AP courses, clinical shadowing, and extracurricular leadership updated. Changes automatically recalculate your college matching odds!
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-right shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Junior Year Readiness</span>
            <span className="text-xl font-black text-brand-600 block mt-0.5">{readinessScore}% Ready</span>
          </div>
        </div>
      </div>

      {/* Basic Academics & Testing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Academic Profile Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            <span>High School & Academic Standing</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) => updateProfile({ fullName: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">High School Name</label>
              <input
                type="text"
                value={profile.highSchool}
                onChange={(e) => updateProfile({ highSchool: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Unweighted GPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4.0"
                value={profile.unweightedGpa}
                onChange={(e) => updateProfile({ unweightedGpa: parseFloat(e.target.value) || 0 })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Weighted GPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="5.5"
                value={profile.weightedGpa}
                onChange={(e) => updateProfile({ weightedGpa: parseFloat(e.target.value) || 0 })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">City / State</label>
              <input
                type="text"
                placeholder="e.g. Austin, TX"
                value={`${profile.city}${profile.state ? ', ' + profile.state : ''}`}
                onChange={(e) => {
                  const parts = e.target.value.split(',');
                  updateProfile({ city: parts[0]?.trim() || '', state: parts[1]?.trim() || '' });
                }}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Graduation Year</label>
              <input
                type="number"
                value={profile.gradYear}
                onChange={(e) => updateProfile({ gradYear: parseInt(e.target.value) || 2028 })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-semibold"
              />
            </div>
          </div>

          {/* AP / IB Coursework manager */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Rigorous AP / IB Science & Math Courses ({profile.apCourses?.length || 0}):
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {(profile.apCourses || []).map((course, idx) => (
                <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 flex items-center space-x-1.5">
                  <span>{course}</span>
                  <button onClick={() => handleRemoveApCourse(course)} className="hover:text-rose-600">×</button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddApCourse} className="flex space-x-2">
              <input
                type="text"
                placeholder="Add AP class (e.g. AP Chemistry, AP Calculus AB)..."
                value={newApCourse}
                onChange={(e) => setNewApCourse(e.target.value)}
                className="text-xs p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 flex-1"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Add Course
              </button>
            </form>
          </div>
        </div>

        {/* Standardized Testing & Career Track */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 pb-3 border-b border-slate-100">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Standardized Testing & Career Direction</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Current SAT Score</label>
              <input
                type="number"
                placeholder="e.g. 1390"
                value={profile.satScore || ''}
                onChange={(e) => updateProfile({ satScore: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-bold text-indigo-700"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">Target SAT Score</label>
              <input
                type="number"
                placeholder="e.g. 1480"
                value={profile.targetSatScore || ''}
                onChange={(e) => updateProfile({ targetSatScore: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-bold text-indigo-700"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">PSAT/NMSQT Score</label>
              <input
                type="number"
                placeholder="e.g. 1360"
                value={profile.psatScore || ''}
                onChange={(e) => updateProfile({ psatScore: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-semibold"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Primary Career Trajectory</label>
            <select
              value={profile.careerGoal}
              onChange={(e) => updateProfile({ careerGoal: e.target.value as CareerGoal })}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-800"
            >
              <option value="crna">🩺 Nurse Anesthetist (CRNA) — Direct-Entry BSN</option>
              <option value="anesthesiologist">🔬 Physician Anesthesiologist (MD/DO) — Pre-Med</option>
              <option value="premed_general">🧬 Pre-Med / Biology General</option>
              <option value="nursing_general">💉 Nursing (BSN) General</option>
              <option value="undecided">🤔 Undecided Healthcare Explorer</option>
            </select>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700 block mb-1">Intended College Majors</label>
            <input
              type="text"
              placeholder="e.g. Direct-Entry Nursing (BSN), Biology, Biochemistry"
              value={profile.intendedMajors.join(', ')}
              onChange={(e) => updateProfile({ intendedMajors: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50 font-semibold"
            />
          </div>

          {/* Quick Hours Summary */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Clinical Shadowing</span>
              <span className="text-lg font-black text-emerald-700">{profile.clinicalHours} Hours</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-[10px] font-bold text-blue-800 uppercase block">Community Service</span>
              <span className="text-lg font-black text-blue-700">{profile.communityServiceHours} Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extracurricular Activities & Clinical Experience */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <HeartPulse className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold text-slate-900">Extracurricular Activities & Clinical Experience</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Colleges look for sustained depth, leadership, and clinical exposure for healthcare programs.
            </p>
          </div>

          <button
            onClick={handleOpenNewActivity}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Activity / Clinical Hours</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.extracurriculars.map(act => (
            <div
              key={act.id}
              className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                      act.category === 'clinical' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : act.category === 'stem_club'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {act.category.replace('_', ' ')}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-2">{act.title}</h4>
                    <p className="text-xs font-semibold text-slate-600">{act.roles} • {act.organization}</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEditActivity(act)}
                      className="p-1.5 text-slate-400 hover:text-slate-700"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteActivity(act.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{act.description}</p>
                {act.highlights && (
                  <p className="text-xs text-brand-700 font-medium mt-1.5 bg-white p-2 rounded-lg border border-slate-200">
                    ⭐ <strong>Highlight:</strong> {act.highlights}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Grades: {act.grades.join(', ')}</span>
                <span className="font-bold text-slate-800">{act.totalHours} total hours ({act.hoursPerWeek}h/wk)</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Honors & Awards */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-bold text-slate-900">Honors, Certifications & Academic Awards</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Certifications like CPR/BLS and science awards (HOSA, AP Scholar) reinforce pre-health readiness.
            </p>
          </div>

          <button
            onClick={() => setIsAwardModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Honor / Award</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {profile.awards.map(aw => (
            <div key={aw.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                    {aw.level} Level
                  </span>
                  <button onClick={() => handleDeleteAward(aw.id)} className="text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-2">{aw.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1">{aw.description}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block mt-3">Grade: {aw.gradeReceived}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Edit Modal */}
      <Modal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        title={editingActivityId ? "Edit Activity / Clinical Hours" : "Add Activity / Clinical Hours"}
        subtitle="Record extracurriculars, clinical shadowing, volunteering, or work"
      >
        <form onSubmit={handleSaveActivity} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Activity Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Hospital ER & Surgical Volunteer"
              value={actTitle}
              onChange={(e) => setActTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Organization / Hospital</label>
              <input
                type="text"
                placeholder="e.g. St. David's Medical Center"
                value={actOrg}
                onChange={(e) => setActOrg(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Category</label>
              <select
                value={actCategory}
                onChange={(e) => setActCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              >
                <option value="clinical">🩺 Clinical Shadowing & Hospital</option>
                <option value="volunteering">🤝 Community Volunteering</option>
                <option value="stem_club">🔬 STEM / HOSA / Science Club</option>
                <option value="leadership">👑 Student Government & Leadership</option>
                <option value="sports">🏃 Varsity Athletics & Sports</option>
                <option value="work">💼 Paid Employment / Work</option>
                <option value="arts">🎨 Arts & Music</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Role / Position</label>
              <input
                type="text"
                placeholder="e.g. Lead Junior Volunteer"
                value={actRole}
                onChange={(e) => setActRole(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Hours / Week</label>
              <input
                type="number"
                value={actHoursPerWeek}
                onChange={(e) => setActHoursPerWeek(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Weeks / Year</label>
              <input
                type="number"
                value={actWeeksPerYear}
                onChange={(e) => setActWeeksPerYear(parseFloat(e.target.value) || 0)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Description (What you did)</label>
            <textarea
              rows={3}
              placeholder="Describe your responsibilities, patients assisted, departments shadowed..."
              value={actDescription}
              onChange={(e) => setActDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Key Impact / Highlights</label>
            <input
              type="text"
              placeholder="e.g. 100+ Hours Pin; Shadowed 15 surgical procedures"
              value={actHighlights}
              onChange={(e) => setActHighlights(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-sm"
            >
              Save Activity
            </button>
          </div>
        </form>
      </Modal>

      {/* Award Modal */}
      <Modal
        isOpen={isAwardModalOpen}
        onClose={() => setIsAwardModalOpen(false)}
        title="Add Honor, Certification or Award"
        subtitle="Highlight academic, athletic, or healthcare achievements"
      >
        <form onSubmit={handleSaveAward} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Honor / Award Title</label>
            <input
              type="text"
              required
              placeholder="e.g. American Red Cross CPR/BLS Certified"
              value={awardTitle}
              onChange={(e) => setAwardTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Recognition Level</label>
              <select
                value={awardLevel}
                onChange={(e) => setAwardLevel(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              >
                <option value="School">School Level</option>
                <option value="Regional">Regional / District</option>
                <option value="State">State Level</option>
                <option value="National">National / International</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Grade Received</label>
              <input
                type="text"
                placeholder="e.g. 11th"
                value={awardGrade}
                onChange={(e) => setAwardGrade(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief details about the recognition..."
              value={awardDesc}
              onChange={(e) => setAwardDesc(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAwardModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 shadow-sm"
            >
              Save Award
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
