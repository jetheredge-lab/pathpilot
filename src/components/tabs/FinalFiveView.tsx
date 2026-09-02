import React, { useState } from 'react';
import { 
  CheckSquare, 
  Building2, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FinalFiveItem } from '../../types';
import { triggerCelebrationConfetti } from '../common/Confetti';
import { TabType } from '../Navbar';

interface FinalFiveViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const FinalFiveView: React.FC<FinalFiveViewProps> = ({ setActiveTab }) => {
  const { 
    finalFive, 
    colleges, 
    removeFromFinalFive, 
    updateFinalFiveItem, 
    toggleFinalFiveChecklist,
    finalFiveCompletionPercent 
  } = useApp();

  const [activeCollegeId, setActiveCollegeId] = useState<string>(finalFive[0]?.collegeId || '');

  // Safety, Target, Reach counts
  const safetyCount = finalFive.filter(f => f.category === 'Safety').length;
  const targetCount = finalFive.filter(f => f.category === 'Target').length;
  const reachCount = finalFive.filter(f => f.category === 'Reach').length;

  const isBalanced = safetyCount >= 1 && targetCount >= 2 && reachCount >= 1;

  const currentItem = finalFive.find(f => f.collegeId === activeCollegeId) || finalFive[0];
  const currentCollege = colleges.find(c => c.id === currentItem?.collegeId);

  const handleChecklistToggle = (itemKey: keyof FinalFiveItem['checklist']) => {
    if (!currentItem) return;
    toggleFinalFiveChecklist(currentItem.collegeId, itemKey);

    // If all checklist items are now true, trigger confetti!
    const updatedChecks = { ...currentItem.checklist, [itemKey]: !currentItem.checklist[itemKey] };
    const allDone = Object.values(updatedChecks).every(Boolean);
    if (allDone) {
      triggerCelebrationConfetti();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & List Balance Advisory */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 text-xs font-semibold mb-2">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span>The "Final 5" Application Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Your Curated 5-School Application Package
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              From "where do I begin?" to a completed application package. Track requirements, transcripts, rec letters, supplements, and portal submissions for each of your 5 target colleges.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('colleges')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shrink-0 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Search & Add Schools</span>
          </button>
        </div>

        {/* List Balance Analysis Banner */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Application List Balance Health:</span>
              </span>
              <div className="flex items-center space-x-3 mt-1.5">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {safetyCount} Likely / Safety
                </span>
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                  {targetCount} Target
                </span>
                <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                  {reachCount} Reach
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-600 max-w-md">
              {finalFive.length < 5 ? (
                <span className="text-amber-700 font-medium">
                  ⚠️ You have selected {finalFive.length} of 5 colleges. Add {5 - finalFive.length} more to finish your complete package!
                </span>
              ) : isBalanced ? (
                <span className="text-emerald-700 font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Your list is perfectly balanced with safety, target, and reach schools!</span>
                </span>
              ) : (
                <span className="text-slate-600">
                  Tip: A standard strong package has 1-2 Safety, 2-3 Target, and 1-2 Reach schools.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {finalFive.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">Your Final 5 Application List is Empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Use the College Matcher to research universities offering top Pre-Med or Direct-Entry BSN programs and click "Add to Final 5".
          </p>
          <button
            onClick={() => setActiveTab('colleges')}
            className="mt-4 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Explore College Matcher
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 Cols): 5 College Navigation Cards */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Select School to Manage:
            </h3>

            {finalFive.map((item, idx) => {
              const college = colleges.find(c => c.id === item.collegeId);
              if (!college) return null;
              const isSelected = item.collegeId === (currentItem?.collegeId || activeCollegeId);
              const progress = finalFiveCompletionPercent(item.collegeId);

              return (
                <div
                  key={item.collegeId}
                  onClick={() => setActiveCollegeId(item.collegeId)}
                  className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">{college.name}</h4>
                        <span className="text-xs text-slate-500">{item.targetMajor}</span>
                      </div>
                    </div>

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

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1">
                      <span>Package Readiness</span>
                      <span className={progress === 100 ? 'text-emerald-600 font-extrabold' : ''}>{progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          progress === 100 ? 'bg-emerald-500' : progress >= 50 ? 'bg-indigo-500' : 'bg-brand-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>Deadline: {college.deadlines.earlyAction || college.deadlines.regularDecision}</span>
                    <span className="font-semibold text-indigo-600">{item.applicationType}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (7 Cols): Comprehensive 12-Point Checklist & Application Package */}
          <div className="lg:col-span-7">
            {currentItem && currentCollege && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* College Selected Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-black text-slate-900">{currentCollege.name}</h2>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                        {currentItem.category} School
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {currentCollege.city}, {currentCollege.state} • {currentCollege.hospitalSystem}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (window.confirm(`Remove ${currentCollege.name} from your Final 5 list?`)) {
                          removeFromFinalFive(currentItem.collegeId);
                        }
                      }}
                      className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-colors"
                      title="Remove from Final 5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Application Parameters (Type, Major, Deadlines) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Application Plan</label>
                    <select
                      value={currentItem.applicationType}
                      onChange={(e) => updateFinalFiveItem(currentItem.collegeId, { applicationType: e.target.value as any })}
                      className="mt-1 w-full bg-white text-xs font-bold py-1 px-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="EA">Early Action (Non-Binding)</option>
                      <option value="ED">Early Decision (Binding)</option>
                      <option value="RD">Regular Decision</option>
                      <option value="Rolling">Rolling Admissions</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Major / College</label>
                    <input
                      type="text"
                      value={currentItem.targetMajor}
                      onChange={(e) => updateFinalFiveItem(currentItem.collegeId, { targetMajor: e.target.value })}
                      className="mt-1 w-full bg-white text-xs font-bold py-1 px-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Submission Deadline</label>
                    <span className="text-xs font-black text-slate-900 block mt-1.5">
                      {currentItem.applicationType === 'EA' 
                        ? (currentCollege.deadlines.earlyAction || currentCollege.deadlines.regularDecision)
                        : currentCollege.deadlines.regularDecision}
                    </span>
                  </div>
                </div>

                {/* 12-Point Granular Checklist */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-slate-900">Application Package Checklist (12 Points)</h3>
                    <span className="text-xs text-indigo-600 font-bold">
                      {finalFiveCompletionPercent(currentItem.collegeId)}% Completed
                    </span>
                  </div>

                  <div className="space-y-2 bg-slate-50 p-4 rounded-3xl border border-slate-200">
                    
                    {/* Section 1: Standard Application & Academics */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      1. Common App & Academic Transcripts
                    </div>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.commonAppAdded}
                        onChange={() => handleChecklistToggle('commonAppAdded')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.commonAppAdded ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Added college to Common App / Coalition App account
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.transcriptRequested}
                        onChange={() => handleChecklistToggle('transcriptRequested')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.transcriptRequested ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        High School Official Transcript ordered & sent by counselor
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.satActSent}
                        onChange={() => handleChecklistToggle('satActSent')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.satActSent ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Official SAT / ACT score report submitted (or marked Test-Optional)
                      </span>
                    </label>

                    {/* Section 2: Recommendations */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-2 mb-1">
                      2. Letters of Recommendation
                    </div>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.counselorRecRequested}
                        onChange={() => handleChecklistToggle('counselorRecRequested')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.counselorRecRequested ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        School Counselor Recommendation requested with Brag Sheet
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.teacherRec1Requested}
                        onChange={() => handleChecklistToggle('teacherRec1Requested')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.teacherRec1Requested ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Teacher Rec #1 (Science / STEM Teacher) requested & submitted
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.teacherRec2Requested}
                        onChange={() => handleChecklistToggle('teacherRec2Requested')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.teacherRec2Requested ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Teacher Rec #2 (Math / Humanities Teacher) requested & submitted
                      </span>
                    </label>

                    {/* Section 3: Essays & Supplements */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-2 mb-1">
                      3. Essays & College Supplements
                    </div>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.supplementEssayDrafted}
                        onChange={() => handleChecklistToggle('supplementEssayDrafted')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.supplementEssayDrafted ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Drafted school-specific essays (e.g. Why Nursing / Why Pre-Med)
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.supplementEssayPolished}
                        onChange={() => handleChecklistToggle('supplementEssayPolished')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.supplementEssayPolished ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Essays proofread and final word counts verified
                      </span>
                    </label>

                    {/* Section 4: Financial Aid & Final Submission */}
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-2 mb-1">
                      4. Financial Aid & Submission Confirmation
                    </div>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.fafsaSubmitted}
                        onChange={() => handleChecklistToggle('fafsaSubmitted')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.fafsaSubmitted ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        FAFSA submitted with college school code
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.cssProfileSubmitted}
                        onChange={() => handleChecklistToggle('cssProfileSubmitted')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.cssProfileSubmitted ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        CSS Profile submitted (for private universities)
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-emerald-50 rounded-xl border border-emerald-200 cursor-pointer hover:bg-emerald-100/60 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.applicationSubmitted}
                        onChange={() => handleChecklistToggle('applicationSubmitted')}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className={`text-xs font-bold ${currentItem.checklist.applicationSubmitted ? 'line-through text-slate-400' : 'text-emerald-950'}`}>
                        🎉 Official Application formally SUBMITTED & Fee Paid
                      </span>
                    </label>

                    <label className="flex items-center space-x-3 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                      <input
                        type="checkbox"
                        checked={currentItem.checklist.portalLoginCreated}
                        onChange={() => handleChecklistToggle('portalLoginCreated')}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                      />
                      <span className={`text-xs ${currentItem.checklist.portalLoginCreated ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                        Applicant Portal login setup & verified all green checks
                      </span>
                    </label>
                  </div>
                </div>

                {/* Notes & Portal URL */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-bold text-slate-900 block mb-1">
                      Applicant Portal URL / Login Notes:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://apply.university.edu/status"
                      value={currentItem.portalUrl || ''}
                      onChange={(e) => updateFinalFiveItem(currentItem.collegeId, { portalUrl: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-900 block mb-1">
                      Personal Application Notes & Strategy:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Add reminders, interview dates, contacts at the nursing or pre-med department..."
                      value={currentItem.notes}
                      onChange={(e) => updateFinalFiveItem(currentItem.collegeId, { notes: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
