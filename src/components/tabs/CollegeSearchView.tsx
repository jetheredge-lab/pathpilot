import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Calendar, 
  Check, 
  Plus, 
  ExternalLink, 
  Heart, 
  Sparkles, 
  Stethoscope, 
  Award, 
  CheckCircle2, 
  Scale, 
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { College, AdmissionChance } from '../../types';
import { getAdmissionChance } from '../../data/colleges';
import { Modal } from '../common/Modal';
import { TabType } from '../Navbar';

interface CollegeSearchViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const CollegeSearchView: React.FC<CollegeSearchViewProps> = ({ setActiveTab }) => {
  const { 
    colleges, 
    profile, 
    savedColleges, 
    toggleSaveCollege, 
    finalFive, 
    addToFinalFive, 
    removeFromFinalFive 
  } = useApp();

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'direct_bsn' | 'premed'>('all');
  const [selectedTier, setSelectedTier] = useState<'all' | 'Safety' | 'Target' | 'Reach'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'Public' | 'Private'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'acceptance_asc' | 'acceptance_desc' | 'sat_desc' | 'tuition_asc'>('match');

  // Modal states
  const [selectedCollegeForModal, setSelectedCollegeForModal] = useState<College | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filter and evaluate colleges against student stats
  const evaluatedColleges = useMemo(() => {
    return colleges.map(college => {
      const chance = getAdmissionChance(
        college, 
        profile.unweightedGpa, 
        profile.satScore, 
        profile.actScore
      );
      return {
        ...college,
        admissionTier: chance
      };
    });
  }, [colleges, profile.unweightedGpa, profile.satScore, profile.actScore]);

  // Apply filters and sorting
  const filteredColleges = useMemo(() => {
    return evaluatedColleges.filter(college => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = college.name.toLowerCase().includes(q);
        const matchCity = college.city.toLowerCase().includes(q);
        const matchState = college.state.toLowerCase().includes(q);
        const matchHospital = college.hospitalSystem.toLowerCase().includes(q);
        const matchTag = college.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchCity && !matchState && !matchHospital && !matchTag) return false;
      }

      // Track filter
      if (selectedTrack === 'direct_bsn' && !college.hasDirectEntryBsn) return false;
      if (selectedTrack === 'premed' && !college.preMedAdvisingRank) return false;

      // Tier filter
      if (selectedTier === 'Safety' && college.admissionTier !== 'Likely / Safety') return false;
      if (selectedTier === 'Target' && college.admissionTier !== 'Target') return false;
      if (selectedTier === 'Reach' && college.admissionTier !== 'Reach' && college.admissionTier !== 'High Reach') return false;

      // Region
      if (selectedRegion !== 'all' && college.region !== selectedRegion) return false;

      // Type
      if (selectedType !== 'all' && college.type !== selectedType) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'acceptance_asc') return a.acceptanceRate - b.acceptanceRate;
      if (sortBy === 'acceptance_desc') return b.acceptanceRate - a.acceptanceRate;
      if (sortBy === 'sat_desc') return b.sat75th - a.sat75th;
      if (sortBy === 'tuition_asc') return a.tuitionInState - b.tuitionInState;
      // Default match tier: Target first, then Safety, then Reach
      const tierRank: Record<string, number> = {
        'Target': 1,
        'Likely / Safety': 2,
        'Reach': 3,
        'High Reach': 4
      };
      return (tierRank[a.admissionTier] || 5) - (tierRank[b.admissionTier] || 5);
    });
  }, [evaluatedColleges, searchQuery, selectedTrack, selectedTier, selectedRegion, selectedType, sortBy]);

  const toggleCompare = (collegeId: string) => {
    setCompareList(prev => {
      if (prev.includes(collegeId)) return prev.filter(id => id !== collegeId);
      if (prev.length >= 3) {
        alert('You can compare up to 3 colleges at once.');
        return prev;
      }
      return [...prev, collegeId];
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Student Match Metrics Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Smart College Admissions Matcher</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Pre-Med & Direct-Entry BSN College Research
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Every college is dynamically categorized as <span className="text-emerald-600 font-bold">Likely/Safety</span>, <span className="text-blue-600 font-bold">Target</span>, or <span className="text-rose-600 font-bold">Reach</span> based on your GPA ({profile.unweightedGpa.toFixed(2)}) and SAT ({profile.satScore || '1390'}).
            </p>
          </div>

          {/* Quick Final 5 Mini Tracker */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center space-x-4 shrink-0">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Final Application List:</span>
              <span className="text-sm font-black text-slate-900 mt-0.5 block">{finalFive.length} of 5 Chosen</span>
            </div>
            <button
              onClick={() => setActiveTab('final_five')}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              View Package
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by college name, city, state, or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          {/* Program Track */}
          <div>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value as any)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700 font-medium"
            >
              <option value="all">All Healthcare Tracks</option>
              <option value="direct_bsn">🩺 Direct-Entry BSN (Nursing)</option>
              <option value="premed">🔬 Top Pre-Med Advising</option>
            </select>
          </div>

          {/* Admissions Tier */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700 font-medium"
            >
              <option value="all">All Admission Odds</option>
              <option value="Safety">🟢 Likely / Safety</option>
              <option value="Target">🟡 Target / Match</option>
              <option value="Reach">🔴 Reach / Competitive</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50 text-slate-700 font-medium"
            >
              <option value="all">All US Regions</option>
              <option value="Northeast">Northeast</option>
              <option value="South">South</option>
              <option value="Midwest">Midwest</option>
              <option value="West">West</option>
            </select>
          </div>
        </div>

        {/* Floating Compare Bar if items selected */}
        {compareList.length > 0 && (
          <div className="mt-4 p-3 bg-brand-50 border border-brand-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-bold text-brand-900">
                Comparing {compareList.length} of 3 colleges
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1"
              >
                Clear
              </button>
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-4 py-1.5 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 transition-colors"
              >
                Open Side-by-Side View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map(college => {
          const isSaved = savedColleges.includes(college.id);
          const inFinalFive = finalFive.some(f => f.collegeId === college.id);
          const isComparing = compareList.includes(college.id);

          return (
            <div 
              key={college.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Card Top */}
              <div className="p-6">
                
                {/* Header row: Admission chance tier badge + Save heart */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    college.admissionTier === 'Likely / Safety'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : college.admissionTier === 'Target'
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'bg-rose-100 text-rose-800 border border-rose-200'
                  }`}>
                    {college.admissionTier}
                  </span>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => toggleCompare(college.id)}
                      className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                        isComparing ? 'bg-brand-100 text-brand-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Add to side-by-side comparison"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                      title="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* College Name & Location */}
                <div className="mt-3">
                  <h3 className="text-lg font-black text-slate-900 leading-snug">{college.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{college.location} • {college.type}</span>
                  </p>
                </div>

                {/* Tags / Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {college.hasDirectEntryBsn && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                      🩺 Direct BSN
                    </span>
                  )}
                  {college.preMedAdvisingRank && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                      🔬 Pre-med advising
                    </span>
                  )}
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    Acceptance: {Math.round(college.acceptanceRate * 100)}%
                  </span>
                </div>

                {/* Key Admissions Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold text-slate-400 block">SAT Mid-50%</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{college.sat25th} - {college.sat75th}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold text-slate-400 block">Average GPA</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{college.avgGpa.toFixed(2)}</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold text-slate-400 block">Tuition (In / Out)</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      ${Math.round(college.tuitionInState/1000)}k / ${Math.round(college.tuitionOutState/1000)}k
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-[10px] font-semibold text-slate-400 block">Early Deadline</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {college.deadlines.earlyAction || college.deadlines.earlyDecision || college.deadlines.regularDecision}
                    </span>
                  </div>
                </div>

                {/* Hospital / Clinical highlight */}
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900 flex items-start space-x-2">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="line-clamp-2"><strong>Hospital:</strong> {college.hospitalSystem}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCollegeForModal(college)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
                >
                  Full Details
                </button>

                {inFinalFive ? (
                  <button
                    onClick={() => removeFromFinalFive(college.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Final 5</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const tier = college.admissionTier.includes('Safety') ? 'Safety' : college.admissionTier.includes('Target') ? 'Target' : 'Reach';
                      addToFinalFive(college.id, tier);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Final 5</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* College Detail Modal */}
      <Modal
        isOpen={!!selectedCollegeForModal}
        onClose={() => setSelectedCollegeForModal(null)}
        title={selectedCollegeForModal?.name || 'College Details'}
        subtitle={`${selectedCollegeForModal?.city}, ${selectedCollegeForModal?.state} • ${selectedCollegeForModal?.type} University`}
        maxWidth="2xl"
      >
        {selectedCollegeForModal && (
          <div className="space-y-6">
            
            {/* Overview Summary */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overview</h4>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{selectedCollegeForModal.summary}</p>
            </div>

            {/* Pathway fit — pre-med (physician) and nursing notes for this college */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <h4 className="text-xs font-bold text-blue-900 flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-blue-700" />
                  <span>Pre-Med / Physician Track</span>
                </h4>
                <p className="text-xs text-blue-800 mt-2">{selectedCollegeForModal.preMedNotes}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                <h4 className="text-xs font-bold text-purple-900 flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-purple-700" />
                  <span>Nursing (BSN) / CRNA Track</span>
                </h4>
                <p className="text-xs text-purple-800 mt-2">{selectedCollegeForModal.nursingNotes}</p>
              </div>
            </div>

            {/* Hospital & Trauma Center Affiliation */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
              <h4 className="text-xs font-bold text-emerald-900 flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Hospital & Surgical Training Facilities</span>
              </h4>
              <p className="text-xs text-emerald-800 mt-1">
                <strong>Affiliated Hospital System:</strong> {selectedCollegeForModal.hospitalSystem}
              </p>
              {selectedCollegeForModal.medicalSchoolAffiliation && (
                <p className="text-xs text-emerald-800 mt-0.5">
                  <strong>Medical School Partner:</strong> {selectedCollegeForModal.medicalSchoolAffiliation}
                </p>
              )}
            </div>

            {/* Key Strengths Checklist */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-2">Program Highlights:</h4>
              <div className="space-y-1.5">
                {selectedCollegeForModal.keyStrengths.map((strength, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Deadlines & Supplements */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-700" />
                <span>Application Deadlines & Requirements</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {selectedCollegeForModal.deadlines.earlyAction && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Early Action</span>
                    <span className="font-bold text-slate-800">{selectedCollegeForModal.deadlines.earlyAction}</span>
                  </div>
                )}
                {selectedCollegeForModal.deadlines.earlyDecision && (
                  <div>
                    <span className="text-slate-400 block text-[10px]">Early Decision</span>
                    <span className="font-bold text-slate-800">{selectedCollegeForModal.deadlines.earlyDecision}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block text-[10px]">Regular Decision</span>
                  <span className="font-bold text-slate-800">{selectedCollegeForModal.deadlines.regularDecision}</span>
                </div>
              </div>

              {selectedCollegeForModal.supplementPromptSummary && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <strong>Supplemental Essays: </strong>{selectedCollegeForModal.supplementPromptSummary}
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="flex justify-between items-center pt-2">
              <a
                href={selectedCollegeForModal.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center space-x-1"
              >
                <span>Visit Official Admissions Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    const tierChance = getAdmissionChance(selectedCollegeForModal, profile.unweightedGpa, profile.satScore, profile.actScore);
                    const tier = tierChance.includes('Safety') ? 'Safety' : tierChance.includes('Target') ? 'Target' : 'Reach';
                    addToFinalFive(selectedCollegeForModal.id, tier);
                    setSelectedCollegeForModal(null);
                  }}
                  className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
                >
                  Add to Final 5 Package
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Side-by-Side Comparison Modal */}
      <Modal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        title="Side-by-Side College Comparison"
        subtitle="Compare admissions competitiveness, clinical facilities, tuition, and deadlines"
        maxWidth="4xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-3 font-bold text-slate-500 w-36">Metric</th>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  if (!college) return null;
                  return (
                    <th key={id} className="p-3 font-black text-slate-900 text-sm">
                      {college.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-3 font-bold text-slate-600">Admissions Chance</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  if (!college) return null;
                  const chance = getAdmissionChance(college, profile.unweightedGpa, profile.satScore, profile.actScore);
                  return (
                    <td key={id} className="p-3 font-bold">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] ${
                        chance.includes('Safety') ? 'bg-emerald-100 text-emerald-800' : chance.includes('Target') ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {chance}
                      </span>
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">Acceptance Rate</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3 font-bold">{college ? `${Math.round(college.acceptanceRate * 100)}%` : '-'}</td>;
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">Direct-Entry BSN</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return (
                    <td key={id} className="p-3">
                      {college?.hasDirectEntryBsn ? (
                        <span className="text-purple-700 font-bold">Yes (Guaranteed Clinicals)</span>
                      ) : (
                        <span className="text-slate-400">Pre-Med / Grad Nursing</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">Hospital Partner</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3 font-semibold text-slate-800">{college?.hospitalSystem}</td>;
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">SAT Mid-50%</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3 font-bold">{college ? `${college.sat25th} - ${college.sat75th}` : '-'}</td>;
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">In-State Tuition</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3 font-bold text-emerald-700">${college?.tuitionInState.toLocaleString()}</td>;
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">Out-of-State Tuition</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3 font-bold">${college?.tuitionOutState.toLocaleString()}</td>;
                })}
              </tr>

              <tr>
                <td className="p-3 font-bold text-slate-600">Early Deadline</td>
                {compareList.map(id => {
                  const college = colleges.find(c => c.id === id);
                  return <td key={id} className="p-3">{college?.deadlines.earlyAction || college?.deadlines.earlyDecision || '-'}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};
