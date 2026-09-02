import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Filter, 
  AlertCircle, 
  Trash2, 
  GraduationCap, 
  BookOpen, 
  Stethoscope, 
  Target, 
  DollarSign, 
  FileText 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TimelineTask } from '../../types';
import { Modal } from '../common/Modal';

export const TimelineView: React.FC = () => {
  const { 
    timelineTasks, 
    toggleTaskCompleted, 
    addCustomTask, 
    deleteTask,
    finalFive,
    colleges 
  } = useApp();

  const [selectedGradeFilter, setSelectedGradeFilter] = useState<'all' | 'Junior Year (11th)' | 'Summer Before Senior' | 'Senior Year (12th)'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TimelineTask['category']>('testing');
  const [newMonth, setNewMonth] = useState('October (Junior Fall)');
  const [newGradeLevel, setNewGradeLevel] = useState<TimelineTask['gradeLevel']>('Junior Year (11th)');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newDescription, setNewDescription] = useState('');

  const completedCount = timelineTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / timelineTasks.length) * 100);

  const filteredTasks = timelineTasks.filter(task => {
    if (selectedGradeFilter !== 'all' && task.gradeLevel !== selectedGradeFilter) return false;
    if (selectedCategory !== 'all' && task.category !== selectedCategory) return false;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addCustomTask({
      title: newTitle,
      category: newCategory,
      targetMonth: newMonth,
      gradeLevel: newGradeLevel,
      priority: newPriority,
      description: newDescription,
      actionItems: ['Complete this custom priority item'],
      completed: false
    });

    setNewTitle('');
    setNewDescription('');
    setIsAddTaskModalOpen(false);
  };

  const getCategoryIcon = (cat: TimelineTask['category']) => {
    switch (cat) {
      case 'testing': return <Target className="w-3.5 h-3.5 text-indigo-600" />;
      case 'academics': return <GraduationCap className="w-3.5 h-3.5 text-blue-600" />;
      case 'clinical': return <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />;
      case 'college_search': return <BookOpen className="w-3.5 h-3.5 text-amber-600" />;
      case 'essays': return <FileText className="w-3.5 h-3.5 text-purple-600" />;
      case 'financial_aid': return <DollarSign className="w-3.5 h-3.5 text-emerald-700" />;
      default: return <Clock className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 text-brand-600" />
              <span>Master Admissions Timeline (11th & 12th Grade)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Junior-to-Senior Year Milestone Roadmap
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              A comprehensive checklist covering testing (SAT/ACT), clinical volunteering, teacher recommendations, essay drafting, and application deadlines.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Overall Roadmap Progress</span>
            <span>{completedCount} of {timelineTasks.length} Milestones Completed ({progressPercent}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Phase Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setSelectedGradeFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedGradeFilter === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Phases
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Junior Year (11th)')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedGradeFilter === 'Junior Year (11th)'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📍 Junior Year (11th Grade) — CURRENT
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Summer Before Senior')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedGradeFilter === 'Summer Before Senior'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ☀️ Summer Before Senior
          </button>
          <button
            onClick={() => setSelectedGradeFilter('Senior Year (12th)')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              selectedGradeFilter === 'Senior Year (12th)'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🎓 Senior Year (12th Grade)
          </button>
        </div>
      </div>

      {/* College Deadlines Quick Bar (Synced from Final 5) */}
      {finalFive.length > 0 && (
        <div className="bg-indigo-50/60 rounded-3xl border border-indigo-200/80 p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-3 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-indigo-700" />
            <span>Upcoming Application Deadlines for Your Final 5 Colleges</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {finalFive.map(item => {
              const college = colleges.find(c => c.id === item.collegeId);
              if (!college) return null;
              return (
                <div key={item.collegeId} className="bg-white p-3 rounded-2xl border border-indigo-100 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">{college.shortName || college.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800">{item.applicationType}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-700 block mt-1">
                    {college.deadlines.earlyAction || college.deadlines.regularDecision}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all ${
              task.completed 
                ? 'border-emerald-200 bg-emerald-50/20' 
                : 'border-slate-200 shadow-sm hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleTaskCompleted(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300 hover:text-slate-500" />
                  )}
                </button>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-0.5 rounded-full">
                      {task.targetMonth}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center space-x-1">
                      {getCategoryIcon(task.category)}
                      <span className="capitalize">{task.category.replace('_', ' ')}</span>
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${
                      task.priority === 'high' ? 'text-rose-600' : 'text-slate-500'
                    }`}>
                      {task.priority} Priority
                    </span>
                  </div>

                  <h3 className={`text-base font-bold mt-2 ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{task.description}</p>

                  {/* Action item checkboxes */}
                  {task.actionItems && task.actionItems.length > 0 && (
                    <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                      {task.actionItems.map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                          <span className="text-brand-500 font-bold">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {task.isCustom && (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Delete custom milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Milestone Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Add Custom Admissions Milestone"
        subtitle="Create a personalized task for your son's college journey"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Milestone Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule Shadowing at St. David's Hospital"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Target Month</label>
              <input
                type="text"
                placeholder="e.g. November (Junior Fall)"
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              >
                <option value="testing">Testing (SAT/ACT)</option>
                <option value="clinical">Clinical & Volunteering</option>
                <option value="academics">Academics & APs</option>
                <option value="college_search">College Search</option>
                <option value="essays">Essays</option>
                <option value="recommendations">Letters of Recommendation</option>
                <option value="financial_aid">Financial Aid</option>
                <option value="applications">Applications</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Phase</label>
              <select
                value={newGradeLevel}
                onChange={(e) => setNewGradeLevel(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              >
                <option value="Junior Year (11th)">Junior Year (11th)</option>
                <option value="Summer Before Senior">Summer Before Senior</option>
                <option value="Senior Year (12th)">Senior Year (12th)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-1">Priority</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 block mb-1">Description / Notes</label>
            <textarea
              rows={3}
              placeholder="Provide details or specific action steps..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-slate-50"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-600 text-white text-xs font-bold rounded-xl hover:bg-brand-700 shadow-sm"
            >
              Save Milestone
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
