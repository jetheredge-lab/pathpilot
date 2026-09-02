import React, { useState } from 'react';
import { 
  MapPin, 
  Star, 
  Plus, 
  Trash2, 
  Building2, 
  Check, 
  Calendar, 
  ThumbsUp, 
  ThumbsDown, 
  Sparkles,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CampusVisit } from '../../types';
import { Modal } from '../common/Modal';

export const CampusVisitsView: React.FC = () => {
  const { campusVisits, saveCampusVisit, deleteCampusVisit, colleges } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollegeId, setSelectedCollegeId] = useState(colleges[0]?.id || '');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  const [overallRating, setOverallRating] = useState(4);
  const [campusVibe, setCampusVibe] = useState(4);
  const [academicFacilities, setAcademicFacilities] = useState(5);
  const [dormAndFood, setDormAndFood] = useState(4);
  const [preMedNursingAdvising, setPreMedNursingAdvising] = useState(5);
  const [locationSafety, setLocationSafety] = useState(4);
  const [prosText, setProsText] = useState('');
  const [consText, setConsText] = useState('');
  const [notes, setNotes] = useState('');
  const [talkedToStudents, setTalkedToStudents] = useState(true);
  const [visitedSimLab, setVisitedSimLab] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const college = colleges.find(c => c.id === selectedCollegeId);
    const newVisit: CampusVisit = {
      id: `visit_${Date.now()}`,
      collegeId: selectedCollegeId,
      collegeName: college?.name || 'College Visit',
      visitDate,
      overallRating,
      ratings: {
        campusVibe,
        academicFacilities,
        dormAndFood,
        preMedNursingAdvising,
        locationSafety
      },
      pros: prosText.split('\n').map(s => s.trim()).filter(Boolean),
      cons: consText.split('\n').map(s => s.trim()).filter(Boolean),
      notes,
      talkedToCurrentStudents: talkedToStudents,
      visitedSimulationLabOrHospital: visitedSimLab
    };

    saveCampusVisit(newVisit);
    setIsModalOpen(false);
    setProsText('');
    setConsText('');
    setNotes('');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Campus Visit & Tour Scorecard</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              College Tour Reflections & Notes
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Spring break and summer of junior year are ideal for visiting colleges. Record simulation lab tours, pre-med advisor access, dorm vibes, and impressions with your son.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Record Campus Tour</span>
          </button>
        </div>
      </div>

      {campusVisits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No Campus Visits Recorded Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Planning a trip during junior spring break? Use our rubric to evaluate nursing simulation labs, hospital proximity, and student life.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Record Your First Campus Visit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campusVisits.map(visit => (
            <div key={visit.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{visit.collegeName}</h3>
                    <span className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Toured on {visit.visitDate}</span>
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-black text-amber-900">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{visit.overallRating} / 5</span>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 text-xs">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Campus Vibe</span>
                    <span className="font-bold text-slate-800">{visit.ratings.campusVibe}/5</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Sim Labs / Facilities</span>
                    <span className="font-bold text-slate-800">{visit.ratings.academicFacilities}/5</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 block">Pre-Health Advising</span>
                    <span className="font-bold text-slate-800">{visit.ratings.preMedNursingAdvising}/5</span>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-2 mt-3 text-xs">
                  {visit.visitedSimulationLabOrHospital && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Toured Hospital / Sim Lab</span>
                    </span>
                  )}
                  {visit.talkedToCurrentStudents && (
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Met Current Students</span>
                    </span>
                  )}
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
                  {visit.pros.length > 0 && (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                      <span className="font-bold text-emerald-900 block mb-1">Pros:</span>
                      <ul className="space-y-1 text-emerald-800">
                        {visit.pros.map((p, i) => (
                          <li key={i}>+ {p}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {visit.cons.length > 0 && (
                    <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                      <span className="font-bold text-rose-900 block mb-1">Cons:</span>
                      <ul className="space-y-1 text-rose-800">
                        {visit.cons.map((c, i) => (
                          <li key={i}>- {c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {visit.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                    <strong>Parent & Student Notes: </strong>{visit.notes}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => deleteCampusVisit(visit.id)}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Tour Record</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Record Visit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Campus Visit Scorecard"
        subtitle="Evaluate the hospital proximity, simulation labs, dorms, and pre-med advisors"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">College Visited</label>
              <select
                value={selectedCollegeId}
                onChange={(e) => setSelectedCollegeId(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50"
              >
                {colleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Date of Visit</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Overall Impression Rating (1-5 Stars)</label>
            <input
              type="range"
              min="1"
              max="5"
              value={overallRating}
              onChange={(e) => setOverallRating(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>1 (Poor)</span>
              <span className="font-bold text-amber-700">{overallRating} Stars</span>
              <span>5 (Outstanding)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Sim Labs & Facilities (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={academicFacilities}
                onChange={(e) => setAcademicFacilities(parseInt(e.target.value))}
                className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Pre-Health Advising (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={preMedNursingAdvising}
                onChange={(e) => setPreMedNursingAdvising(parseInt(e.target.value))}
                className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={visitedSimLab}
                onChange={(e) => setVisitedSimLab(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span>Toured hospital or nursing simulation lab</span>
            </label>
            <label className="flex items-center space-x-2 text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={talkedToStudents}
                onChange={(e) => setTalkedToStudents(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span>Spoke with current pre-med or nursing undergraduates</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Pros (one per line)</label>
              <textarea
                rows={2}
                placeholder="Walkable hospital, brand new dorms..."
                value={prosText}
                onChange={(e) => setProsText(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Cons (one per line)</label>
              <textarea
                rows={2}
                placeholder="Far from home, large lecture halls..."
                value={consText}
                onChange={(e) => setConsText(e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">General Tour Reflections & Notes</label>
            <textarea
              rows={2}
              placeholder="Key impressions from tour guide and information session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-slate-50"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 shadow-sm"
            >
              Save Scorecard
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
