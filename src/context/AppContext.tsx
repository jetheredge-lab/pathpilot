import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  StudentProfile,
  College,
  TimelineTask,
  FinalFiveItem,
  EssayDraft,
  CampusVisit,
  AwardLetter,
  CourseEntry
} from '../types';
import { COLLEGES_DATABASE } from '../data/colleges';
import { DEFAULT_TIMELINE_TASKS } from '../data/timelineDefaults';
import { SAMPLE_STUDENT_PROFILE, SAMPLE_FINAL_FIVE, SAMPLE_ESSAYS } from '../data/sampleProfile';
import { computeReadinessScore } from '../lib/readiness';
import { getFinancialsByUnitId, Financials } from '../api/scorecard';
import { scorecardToCollege, isScorecardId, unitIdFromCollegeId } from '../lib/scorecardCollege';
import {
  StudentSummary,
  StudentBundle,
  listStudents,
  createStudent,
  getStudent,
  patchProfile,
  deleteStudent as apiDeleteStudent,
  replaceState,
  addSavedCollege,
  removeSavedCollege,
  addFinalFive,
  patchFinalFive,
  removeFinalFive,
  putTask,
  deleteTaskApi,
  putEssay,
  deleteEssayApi,
  putCampusVisit,
  deleteCampusVisitApi,
  putAwardLetter,
  deleteAwardLetterApi,
  putCourseEntry,
  deleteCourseEntryApi,
} from '../api/students';

// Backend sync status, surfaced in the UI so the user knows their data is safe.
export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline';

interface AppContextType {
  // Multi-student
  students: StudentSummary[];
  currentStudentId: string | null;
  selectStudent: (id: string) => void;
  addStudent: (name?: string) => void;
  deleteStudent: (id: string) => void;
  renameStudent: (id: string, name: string) => void;

  profile: StudentProfile;
  updateProfile: (profile: Partial<StudentProfile>) => void;
  savedColleges: string[];
  toggleSaveCollege: (collegeId: string) => void;
  finalFive: FinalFiveItem[];
  addToFinalFive: (collegeId: string, category?: 'Safety' | 'Target' | 'Reach') => void;
  removeFromFinalFive: (collegeId: string) => void;
  updateFinalFiveItem: (collegeId: string, updates: Partial<FinalFiveItem>) => void;
  toggleFinalFiveChecklist: (collegeId: string, itemKey: keyof FinalFiveItem['checklist']) => void;
  timelineTasks: TimelineTask[];
  toggleTaskCompleted: (taskId: string) => void;
  addCustomTask: (task: Omit<TimelineTask, 'id' | 'isCustom'>) => void;
  deleteTask: (taskId: string) => void;
  essays: EssayDraft[];
  saveEssay: (essay: EssayDraft) => void;
  deleteEssay: (essayId: string) => void;
  campusVisits: CampusVisit[];
  saveCampusVisit: (visit: CampusVisit) => void;
  deleteCampusVisit: (visitId: string) => void;
  awardLetters: AwardLetter[];
  saveAwardLetter: (letter: AwardLetter) => void;
  deleteAwardLetter: (letterId: string) => void;
  courseEntries: CourseEntry[];
  saveCourseEntry: (course: CourseEntry) => void;
  deleteCourseEntry: (courseId: string) => void;
  loadSampleData: () => void;
  resetAllData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  colleges: College[];
  addExternalColleges: (list: College[]) => void;
  syncStatus: SyncStatus;
  readinessScore: number;
  completedTasksCount: number;
  finalFiveCompletionPercent: (collegeId: string) => number;
}

const CURRENT_STUDENT_KEY = 'roundsahead_current_student';

const defaultEmptyProfile: StudentProfile = {
  id: 'student_user',
  fullName: '',
  gradYear: 2028,
  currentGrade: '11th (Junior)',
  highSchool: '',
  city: '',
  state: '',
  unweightedGpa: 3.8,
  weightedGpa: 4.1,
  satScore: null,
  actScore: null,
  targetSatScore: 1450,
  psatScore: null,
  apIbCoursesCount: 4,
  apCourses: [],
  careerGoal: 'crna',
  intendedMajors: ['Direct-Entry Nursing (BSN)', 'Pre-Med / Biology'],
  clinicalHours: 0,
  communityServiceHours: 0,
  extracurriculars: [],
  awards: [],
  targetCollegeCount: 5,
  budgetPerYear: null,
  preferredRegions: ['South', 'Midwest', 'Northeast'],
  notes: ''
};

const DEFAULT_CHECKLIST: FinalFiveItem['checklist'] = {
  commonAppAdded: true,
  transcriptRequested: false,
  satActSent: false,
  counselorRecRequested: false,
  teacherRec1Requested: false,
  teacherRec2Requested: false,
  supplementEssayDrafted: false,
  supplementEssayPolished: false,
  fafsaSubmitted: false,
  cssProfileSubmitted: false,
  applicationSubmitted: false,
  portalLoginCreated: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [currentStudentId, setCurrentStudentId] = useState<string | null>(null);

  const [profile, setProfile] = useState<StudentProfile>(defaultEmptyProfile);
  const [savedColleges, setSavedColleges] = useState<string[]>([]);
  const [finalFive, setFinalFive] = useState<FinalFiveItem[]>([]);
  const [timelineTasks, setTimelineTasks] = useState<TimelineTask[]>([]);
  const [essays, setEssays] = useState<EssayDraft[]>([]);
  const [campusVisits, setCampusVisits] = useState<CampusVisit[]>([]);
  const [awardLetters, setAwardLetters] = useState<AwardLetter[]>([]);
  const [courseEntries, setCourseEntries] = useState<CourseEntry[]>([]);
  // Scorecard-discovered colleges (adapted to the College shape), merged into
  // the college pool so every `colleges.find(id)` resolves them.
  const [externalColleges, setExternalColleges] = useState<College[]>([]);

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('syncing');
  const [loading, setLoading] = useState(true);

  // Reflect an API call's outcome in the sync indicator.
  const track = (p: Promise<{ ok: boolean }>) => {
    setSyncStatus('syncing');
    p.then((r) => setSyncStatus(r.ok ? 'synced' : 'offline')).catch(() => setSyncStatus('offline'));
  };

  const applyBundle = (b: StudentBundle) => {
    setProfile(b.profile);
    setSavedColleges(b.savedColleges);
    setFinalFive(b.finalFive);
    setTimelineTasks(b.timelineTasks);
    setEssays(b.essays);
    setCampusVisits(b.campusVisits);
    setAwardLetters(b.awardLetters ?? []);
    setCourseEntries(b.courseEntries ?? []);
  };

  // Default-task ids are the same constants for everyone, but each task row is
  // per-student with a globally-unique id, so seed every student with fresh ids.
  const freshDefaultTasks = (): TimelineTask[] =>
    DEFAULT_TIMELINE_TASKS.map((t) => ({ ...t, id: `${t.id}_${Math.random().toString(36).slice(2, 10)}` }));

  const seedBundle = (): Partial<StudentBundle> => ({
    profile: { ...defaultEmptyProfile, fullName: '' } as StudentProfile,
    timelineTasks: freshDefaultTasks(),
  });

  const addExternalColleges = (list: College[]) => {
    setExternalColleges((prev) => {
      const map = new Map(prev.map((c) => [c.id, c]));
      for (const c of list) map.set(c.id, c);
      return Array.from(map.values());
    });
  };

  // Rebuild College objects for any saved Scorecard schools (ids like sc_215293)
  // so they resolve everywhere the app looks up colleges by id.
  const rehydrateExternal = async (collegeIds: string[]) => {
    const unitIds = [
      ...new Set(
        collegeIds.filter(isScorecardId).map(unitIdFromCollegeId).filter((n): n is number => n != null),
      ),
    ];
    if (unitIds.length === 0) return;
    const fins = await Promise.all(unitIds.map(getFinancialsByUnitId));
    const adapted = fins.filter((f): f is Financials => !!f).map(scorecardToCollege);
    if (adapted.length) addExternalColleges(adapted);
  };

  // Initial load: fetch the account's students, then the selected student's data.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setSyncStatus('syncing');
      let list = await listStudents();
      if (cancelled) return;

      let bundle: StudentBundle | null = null;
      let selectedId: string | null = null;

      if (list.length === 0) {
        bundle = await createStudent(seedBundle());
        if (bundle) {
          selectedId = bundle.profile.id;
          list = await listStudents();
        }
      } else {
        const lastId = localStorage.getItem(CURRENT_STUDENT_KEY);
        selectedId = lastId && list.some((s) => s.id === lastId) ? lastId : list[0].id;
        bundle = await getStudent(selectedId);
      }
      if (cancelled) return;

      setStudents(list);
      if (bundle) {
        applyBundle(bundle);
        void rehydrateExternal([...bundle.savedColleges, ...bundle.finalFive.map((f) => f.collegeId)]);
      }
      if (selectedId) {
        setCurrentStudentId(selectedId);
        localStorage.setItem(CURRENT_STUDENT_KEY, selectedId);
      }
      setSyncStatus(bundle ? 'synced' : 'offline');
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ── Student management ──
  const selectStudent = async (id: string) => {
    if (id === currentStudentId) return;
    setSyncStatus('syncing');
    const b = await getStudent(id);
    if (b) {
      applyBundle(b);
      void rehydrateExternal([...b.savedColleges, ...b.finalFive.map((f) => f.collegeId)]);
      setCurrentStudentId(id);
      localStorage.setItem(CURRENT_STUDENT_KEY, id);
      setSyncStatus('synced');
    } else {
      setSyncStatus('offline');
    }
  };

  const addStudent = async (name = 'New student') => {
    setSyncStatus('syncing');
    const b = await createStudent({ profile: { ...defaultEmptyProfile, fullName: name } as StudentProfile, timelineTasks: freshDefaultTasks() });
    if (b) {
      applyBundle(b);
      setCurrentStudentId(b.profile.id);
      localStorage.setItem(CURRENT_STUDENT_KEY, b.profile.id);
      setStudents(await listStudents());
      setSyncStatus('synced');
    } else {
      setSyncStatus('offline');
    }
  };

  const deleteStudent = async (id: string) => {
    setSyncStatus('syncing');
    await apiDeleteStudent(id);
    const list = await listStudents();
    setStudents(list);
    if (id === currentStudentId) {
      if (list.length > 0) {
        await selectStudent(list[0].id);
      } else {
        await addStudent('New student');
      }
    } else {
      setSyncStatus('synced');
    }
  };

  const renameStudent = (id: string, name: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, fullName: name } : s)));
    if (id === currentStudentId) {
      updateProfile({ fullName: name });
    } else {
      track(patchProfile(id, { fullName: name }));
    }
  };

  // ── Profile (debounced PATCH) ──
  const pendingProfile = useRef<Partial<StudentProfile>>({});
  const profileTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
    // Keep the student switcher label in sync.
    setStudents((prev) =>
      prev.map((s) =>
        s.id === currentStudentId
          ? {
              ...s,
              fullName: updates.fullName ?? s.fullName,
              gradYear: updates.gradYear ?? s.gradYear,
              currentGrade: updates.currentGrade ?? s.currentGrade,
            }
          : s,
      ),
    );
    const id = currentStudentId;
    if (!id) return;
    pendingProfile.current = { ...pendingProfile.current, ...updates };
    if (profileTimer.current) clearTimeout(profileTimer.current);
    setSyncStatus('syncing');
    profileTimer.current = setTimeout(async () => {
      const payload = pendingProfile.current;
      pendingProfile.current = {};
      const r = await patchProfile(id, payload);
      setSyncStatus(r.ok ? 'synced' : 'offline');
    }, 700);
  };

  // ── Saved colleges ──
  const toggleSaveCollege = (collegeId: string) => {
    const id = currentStudentId;
    if (!id) return;
    const isSaved = savedColleges.includes(collegeId);
    setSavedColleges((prev) => (isSaved ? prev.filter((c) => c !== collegeId) : [...prev, collegeId]));
    track(isSaved ? removeSavedCollege(id, collegeId) : addSavedCollege(id, collegeId));
  };

  // ── Final five ──
  const addToFinalFive = (collegeId: string, category: 'Safety' | 'Target' | 'Reach' = 'Target') => {
    const id = currentStudentId;
    if (!id) return;
    if (finalFive.some((item) => item.collegeId === collegeId)) return;
    if (finalFive.length >= 5) {
      alert('You already have 5 schools in your Final Application Package. You can remove or replace one to add a new school.');
      return;
    }
    const targetMajor = profile.intendedMajors[0] || 'Direct-Entry BSN';
    const newItem: FinalFiveItem = {
      collegeId,
      applicationType: 'EA',
      status: 'researching',
      category,
      targetMajor,
      notes: '',
      checklist: { ...DEFAULT_CHECKLIST },
    };
    setFinalFive((prev) => [...prev, newItem]);
    track(addFinalFive(id, collegeId, category, targetMajor));
  };

  const removeFromFinalFive = (collegeId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setFinalFive((prev) => prev.filter((item) => item.collegeId !== collegeId));
    track(removeFinalFive(id, collegeId));
  };

  const updateFinalFiveItem = (collegeId: string, updates: Partial<FinalFiveItem>) => {
    const id = currentStudentId;
    if (!id) return;
    setFinalFive((prev) => prev.map((item) => (item.collegeId === collegeId ? { ...item, ...updates } : item)));
    track(patchFinalFive(id, collegeId, updates));
  };

  const toggleFinalFiveChecklist = (collegeId: string, itemKey: keyof FinalFiveItem['checklist']) => {
    const id = currentStudentId;
    if (!id) return;
    const item = finalFive.find((i) => i.collegeId === collegeId);
    if (!item) return;
    const updatedChecklist = { ...item.checklist, [itemKey]: !item.checklist[itemKey] };
    let updatedStatus = item.status;
    if (itemKey === 'applicationSubmitted' && updatedChecklist.applicationSubmitted) {
      updatedStatus = 'submitted';
    }
    setFinalFive((prev) =>
      prev.map((i) => (i.collegeId === collegeId ? { ...i, checklist: updatedChecklist, status: updatedStatus } : i)),
    );
    track(patchFinalFive(id, collegeId, { checklist: updatedChecklist, status: updatedStatus }));
  };

  // ── Timeline tasks ──
  const toggleTaskCompleted = (taskId: string) => {
    const id = currentStudentId;
    if (!id) return;
    const task = timelineTasks.find((t) => t.id === taskId);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    setTimelineTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
    track(putTask(id, updated));
  };

  const addCustomTask = (taskData: Omit<TimelineTask, 'id' | 'isCustom'>) => {
    const id = currentStudentId;
    if (!id) return;
    const newTask: TimelineTask = { ...taskData, id: `custom_${Date.now()}`, isCustom: true };
    setTimelineTasks((prev) => [newTask, ...prev]);
    track(putTask(id, newTask));
  };

  const deleteTask = (taskId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setTimelineTasks((prev) => prev.filter((t) => t.id !== taskId));
    track(deleteTaskApi(id, taskId));
  };

  // ── Essays ──
  const saveEssay = (essay: EssayDraft) => {
    const id = currentStudentId;
    if (!id) return;
    const withDate = { ...essay, lastEdited: new Date().toISOString().split('T')[0] };
    setEssays((prev) => {
      const idx = prev.findIndex((e) => e.id === essay.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = withDate;
        return next;
      }
      return [withDate, ...prev];
    });
    track(putEssay(id, withDate));
  };

  const deleteEssay = (essayId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setEssays((prev) => prev.filter((e) => e.id !== essayId));
    track(deleteEssayApi(id, essayId));
  };

  // ── Campus visits ──
  const saveCampusVisit = (visit: CampusVisit) => {
    const id = currentStudentId;
    if (!id) return;
    setCampusVisits((prev) => {
      const idx = prev.findIndex((v) => v.id === visit.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = visit;
        return next;
      }
      return [visit, ...prev];
    });
    track(putCampusVisit(id, visit));
  };

  const deleteCampusVisit = (visitId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setCampusVisits((prev) => prev.filter((v) => v.id !== visitId));
    track(deleteCampusVisitApi(id, visitId));
  };

  // ── Award letters ──
  const saveAwardLetter = (letter: AwardLetter) => {
    const id = currentStudentId;
    if (!id) return;
    setAwardLetters((prev) => {
      const idx = prev.findIndex((l) => l.id === letter.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = letter;
        return next;
      }
      return [...prev, letter];
    });
    track(putAwardLetter(id, letter));
  };

  const deleteAwardLetter = (letterId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setAwardLetters((prev) => prev.filter((l) => l.id !== letterId));
    track(deleteAwardLetterApi(id, letterId));
  };

  // ── Course entries ──
  const saveCourseEntry = (course: CourseEntry) => {
    const id = currentStudentId;
    if (!id) return;
    setCourseEntries((prev) => {
      const idx = prev.findIndex((c) => c.id === course.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = course;
        return next;
      }
      return [...prev, course];
    });
    track(putCourseEntry(id, course));
  };

  const deleteCourseEntry = (courseId: string) => {
    const id = currentStudentId;
    if (!id) return;
    setCourseEntries((prev) => prev.filter((c) => c.id !== courseId));
    track(deleteCourseEntryApi(id, courseId));
  };

  // ── Bulk operations (replace the whole current student) ──
  const bulkReplace = async (bundle: Partial<StudentBundle>) => {
    const id = currentStudentId;
    if (!id) return;
    setSyncStatus('syncing');
    const saved = await replaceState(id, bundle);
    if (saved) {
      applyBundle(saved);
      setStudents((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, fullName: saved.profile.fullName, gradYear: saved.profile.gradYear, currentGrade: saved.profile.currentGrade }
            : s,
        ),
      );
      setSyncStatus('synced');
    } else {
      setSyncStatus('offline');
    }
  };

  const loadSampleData = () => {
    const sample: Partial<StudentBundle> = {
      profile: SAMPLE_STUDENT_PROFILE,
      savedColleges: ['case_western', 'pitt', 'villanova', 'upenn', 'slu', 'emory', 'osu'],
      finalFive: SAMPLE_FINAL_FIVE,
      timelineTasks: freshDefaultTasks(),
      essays: SAMPLE_ESSAYS,
      campusVisits: [],
      awardLetters: [],
      courseEntries: [],
    };
    applyBundle(sample as StudentBundle); // optimistic
    void bulkReplace(sample);
  };

  const resetAllData = () => {
    const empty: Partial<StudentBundle> = {
      profile: defaultEmptyProfile,
      savedColleges: [],
      finalFive: [],
      timelineTasks: freshDefaultTasks().map((t) => ({ ...t, completed: false })),
      essays: [],
      campusVisits: [],
      awardLetters: [],
      courseEntries: [],
    };
    applyBundle(empty as StudentBundle);
    void bulkReplace(empty);
  };

  const exportDataJSON = () => {
    const backup = {
      profile,
      savedColleges,
      finalFive,
      timelineTasks,
      essays,
      campusVisits,
      awardLetters,
      courseEntries,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;

      const isObject = (v: unknown) => typeof v === 'object' && v !== null && !Array.isArray(v);
      if ('profile' in parsed && !isObject(parsed.profile)) return false;
      if ('savedColleges' in parsed && !Array.isArray(parsed.savedColleges)) return false;
      if ('finalFive' in parsed && !Array.isArray(parsed.finalFive)) return false;
      if ('timelineTasks' in parsed && !Array.isArray(parsed.timelineTasks)) return false;
      if ('essays' in parsed && !Array.isArray(parsed.essays)) return false;
      if ('campusVisits' in parsed && !Array.isArray(parsed.campusVisits)) return false;
      if ('awardLetters' in parsed && !Array.isArray(parsed.awardLetters)) return false;
      if ('courseEntries' in parsed && !Array.isArray(parsed.courseEntries)) return false;

      const knownKeys = ['profile', 'savedColleges', 'finalFive', 'timelineTasks', 'essays', 'campusVisits', 'awardLetters', 'courseEntries'];
      if (!knownKeys.some((key) => key in parsed)) return false;

      const bundle: Partial<StudentBundle> = {
        profile: parsed.profile ?? profile,
        savedColleges: parsed.savedColleges ?? savedColleges,
        finalFive: parsed.finalFive ?? finalFive,
        timelineTasks: parsed.timelineTasks ?? timelineTasks,
        essays: parsed.essays ?? essays,
        campusVisits: parsed.campusVisits ?? campusVisits,
        awardLetters: parsed.awardLetters ?? awardLetters,
        courseEntries: parsed.courseEntries ?? courseEntries,
      };
      applyBundle(bundle as StudentBundle); // optimistic
      void bulkReplace(bundle);
      return true;
    } catch (e) {
      console.error('Failed to import JSON data', e);
      return false;
    }
  };

  // ── Analytics ──
  const completedTasksCount = timelineTasks.filter((t) => t.completed).length;
  const readinessScore = computeReadinessScore(profile, finalFive.length, essays.length);

  const finalFiveCompletionPercent = (collegeId: string): number => {
    const item = finalFive.find((f) => f.collegeId === collegeId);
    if (!item) return 0;
    const checks = Object.values(item.checklist);
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-slate-300 border-t-brand-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        students,
        currentStudentId,
        selectStudent,
        addStudent,
        deleteStudent,
        renameStudent,
        profile,
        updateProfile,
        savedColleges,
        toggleSaveCollege,
        finalFive,
        addToFinalFive,
        removeFromFinalFive,
        updateFinalFiveItem,
        toggleFinalFiveChecklist,
        timelineTasks,
        toggleTaskCompleted,
        addCustomTask,
        deleteTask,
        essays,
        saveEssay,
        deleteEssay,
        campusVisits,
        saveCampusVisit,
        deleteCampusVisit,
        awardLetters,
        saveAwardLetter,
        deleteAwardLetter,
        courseEntries,
        saveCourseEntry,
        deleteCourseEntry,
        loadSampleData,
        resetAllData,
        exportDataJSON,
        importDataJSON,
        colleges: [...COLLEGES_DATABASE, ...externalColleges],
        addExternalColleges,
        syncStatus,
        readinessScore,
        completedTasksCount,
        finalFiveCompletionPercent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
