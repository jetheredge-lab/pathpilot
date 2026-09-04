import React, { useState } from 'react';
import { CalendarRange, Plus, X, Lightbulb, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CourseEntry, CourseLevel } from '../../types';
import { recommendedCourses, pathwayEmphasis, DECISION_POINTS, SUBJECTS } from '../../lib/coursePlan';

const GRADES = [9, 10, 11, 12];
const LEVELS: { value: CourseLevel; label: string }[] = [
  { value: 'regular', label: 'Regular' },
  { value: 'honors', label: 'Honors' },
  { value: 'ap', label: 'AP' },
  { value: 'ib', label: 'IB' },
  { value: 'dual', label: 'Dual enrollment' },
];

const levelBadge: Record<CourseLevel, string> = {
  regular: 'bg-slate-100 text-slate-600',
  honors: 'bg-blue-100 text-blue-700',
  ap: 'bg-purple-100 text-purple-700',
  ib: 'bg-indigo-100 text-indigo-700',
  dual: 'bg-amber-100 text-amber-700',
};

const newId = () => `course_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export const CoursePlannerView: React.FC = () => {
  const { profile, courseEntries, saveCourseEntry, deleteCourseEntry } = useApp();
  const [addingGrade, setAddingGrade] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; subject: string; level: CourseLevel }>({
    name: '',
    subject: 'Science',
    level: 'regular',
  });

  const recs = recommendedCourses();

  const addCourse = (grade: number, name: string, subject: string, level: CourseLevel) => {
    if (!name.trim()) return;
    saveCourseEntry({ id: newId(), grade, subject, name: name.trim(), level, completed: false });
  };

  const toggleComplete = (c: CourseEntry) => saveCourseEntry({ ...c, completed: !c.completed });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <CalendarRange className="w-6 h-6 text-brand-600" />
          Four-Year Course Planner
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Map grades 9–12. The course sequence is the part a family can still change — and it decides what stays possible.
        </p>
        <p className="text-sm text-brand-800 bg-brand-50 border border-brand-100 rounded-lg px-3 py-2 mt-3">
          <Lightbulb className="w-4 h-4 inline -mt-0.5 mr-1 text-brand-600" />
          {pathwayEmphasis(profile.careerGoal)}
        </p>
      </div>

      {/* Decision points */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">Decisions that open or close doors</h3>
        <ul className="space-y-1.5">
          {DECISION_POINTS.map((d, i) => (
            <li key={i} className="text-xs text-amber-900 flex items-start gap-2">
              <span className="text-amber-500 font-bold">•</span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Grade columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {GRADES.map((grade) => {
          const courses = courseEntries.filter((c) => c.grade === grade);
          const suggestions = recs.filter(
            (r) => r.grade === grade && !courses.some((c) => c.name.toLowerCase() === r.name.toLowerCase()),
          );
          return (
            <div key={grade} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-slate-900">
                  Grade {grade}
                  <span className="ml-1.5 text-[11px] font-bold text-slate-400">
                    {grade === 9 ? 'Freshman' : grade === 10 ? 'Sophomore' : grade === 11 ? 'Junior' : 'Senior'}
                  </span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">{courses.length} course{courses.length === 1 ? '' : 's'}</span>
              </div>

              {/* Added courses */}
              <div className="space-y-1.5">
                {courses.map((c) => (
                  <div key={c.id} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-2 py-1.5">
                    <button
                      onClick={() => toggleComplete(c)}
                      title={c.completed ? 'Completed' : 'Mark completed'}
                      className={`w-4 h-4 rounded flex-none flex items-center justify-center border ${
                        c.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {c.completed && <Check className="w-3 h-3" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className={`text-xs font-semibold truncate ${c.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {c.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{c.subject}</div>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${levelBadge[c.level]}`}>
                      {c.level === 'regular' ? 'REG' : c.level.toUpperCase()}
                    </span>
                    <button onClick={() => deleteCourseEntry(c.id)} className="text-slate-300 hover:text-rose-500 flex-none">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {courses.length === 0 && <p className="text-[11px] text-slate-400 py-1">No courses planned yet.</p>}
              </div>

              {/* Suggested */}
              {suggestions.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">Suggested for pre-health</div>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => addCourse(grade, s.name, s.subject, 'regular')}
                        title={s.note ? s.note : `Add ${s.name}`}
                        className="text-[10px] font-semibold px-2 py-1 rounded-md bg-brand-50 text-brand-700 border border-brand-100 hover:bg-brand-100"
                      >
                        + {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add custom */}
              {addingGrade === grade ? (
                <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                  <input
                    autoFocus
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    placeholder="Course name"
                    className="w-full text-xs px-2 py-1.5 rounded border border-slate-300"
                  />
                  <div className="flex gap-1.5">
                    <select
                      value={draft.subject}
                      onChange={(e) => setDraft((d) => ({ ...d, subject: e.target.value }))}
                      className="flex-1 text-[11px] px-1.5 py-1.5 rounded border border-slate-300 bg-white"
                    >
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select
                      value={draft.level}
                      onChange={(e) => setDraft((d) => ({ ...d, level: e.target.value as CourseLevel }))}
                      className="flex-1 text-[11px] px-1.5 py-1.5 rounded border border-slate-300 bg-white"
                    >
                      {LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => {
                        addCourse(grade, draft.name, draft.subject, draft.level);
                        setDraft({ name: '', subject: 'Science', level: 'regular' });
                        setAddingGrade(null);
                      }}
                      className="flex-1 text-xs font-semibold py-1.5 rounded bg-brand-600 text-white hover:bg-brand-700"
                    >
                      Add
                    </button>
                    <button onClick={() => setAddingGrade(null)} className="px-2 text-xs text-slate-500">Cancel</button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingGrade(grade)}
                  className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-semibold py-1.5 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-brand-400 hover:text-brand-600"
                >
                  <Plus className="w-3.5 h-3.5" /> Add your own
                </button>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-400">
        Course names vary by school — enter yours as they appear. These are general pre-health recommendations, not a
        guarantee of what your school offers or what a specific college requires. Confirm requirements with your
        counselor and target programs.
      </p>
    </div>
  );
};
