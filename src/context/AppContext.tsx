import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  StudentProfile,
  College,
  TimelineTask,
  FinalFiveItem,
  EssayDraft,
  CampusVisit
} from '../types';
import { COLLEGES_DATABASE } from '../data/colleges';
import { DEFAULT_TIMELINE_TASKS } from '../data/timelineDefaults';
import { SAMPLE_STUDENT_PROFILE, SAMPLE_FINAL_FIVE, SAMPLE_ESSAYS } from '../data/sampleProfile';
import { fetchRemoteState, saveRemoteState } from '../api/sync';

// Backend sync status, surfaced in the UI so the user knows their data is safe.
//  - 'local'   : running on local data only (backend not reached yet / offline)
//  - 'syncing' : a load or save is in flight
//  - 'synced'  : successfully saved to the server
//  - 'offline' : a save was attempted but the backend was unreachable
export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline';

interface AppContextType {
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
  loadSampleData: () => void;
  resetAllData: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  colleges: College[];
  // Sync
  syncStatus: SyncStatus;
  // Analytics helpers
  readinessScore: number;
  completedTasksCount: number;
  finalFiveCompletionPercent: (collegeId: string) => number;
}

const STORAGE_KEY = 'pathpilot_college_prep_data_v1';

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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage if present, otherwise start blank. Fresh
  // visitors get an empty portfolio (not a pretend student); the "Load Sample
  // Profile" button in the navbar populates realistic demo data on demand.
  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : defaultEmptyProfile;
  });

  const [savedColleges, setSavedColleges] = useState<string[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_savedColleges`);
    return saved ? JSON.parse(saved) : [];
  });

  const [finalFive, setFinalFive] = useState<FinalFiveItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_finalFive`);
    return saved ? JSON.parse(saved) : [];
  });

  const [timelineTasks, setTimelineTasks] = useState<TimelineTask[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_timelineTasks`);
    // The default timeline is generic 11th->12th grade scaffolding, useful for
    // everyone, so it seeds a new portfolio rather than starting empty.
    return saved ? JSON.parse(saved) : DEFAULT_TIMELINE_TASKS;
  });

  const [essays, setEssays] = useState<EssayDraft[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_essays`);
    return saved ? JSON.parse(saved) : [];
  });

  const [campusVisits, setCampusVisits] = useState<CampusVisit[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_campusVisits`);
    return saved ? JSON.parse(saved) : [];
  });

  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local');
  // Guards the autosave effect from firing (and clobbering server data with an
  // empty local state) before the initial remote load has completed.
  const hasHydrated = useRef(false);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_savedColleges`, JSON.stringify(savedColleges));
  }, [savedColleges]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_finalFive`, JSON.stringify(finalFive));
  }, [finalFive]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_timelineTasks`, JSON.stringify(timelineTasks));
  }, [timelineTasks]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_essays`, JSON.stringify(essays));
  }, [essays]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_campusVisits`, JSON.stringify(campusVisits));
  }, [campusVisits]);

  // On mount: pull this user's saved state from the backend (identity handled
  // by Cloudflare Access). Server data wins over the local cache when present.
  // If the backend is unreachable, we silently keep running on localStorage.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setSyncStatus('syncing');
      const { reachable, data } = await fetchRemoteState();
      if (cancelled) return;
      if (reachable && data) {
        if (data.profile) setProfile(data.profile as StudentProfile);
        if (data.savedColleges) setSavedColleges(data.savedColleges as string[]);
        if (data.finalFive) setFinalFive(data.finalFive as FinalFiveItem[]);
        if (data.timelineTasks) setTimelineTasks(data.timelineTasks as TimelineTask[]);
        if (data.essays) setEssays(data.essays as EssayDraft[]);
        if (data.campusVisits) setCampusVisits(data.campusVisits as CampusVisit[]);
        setSyncStatus('synced');
      } else {
        // Reachable-but-empty (new user) or unreachable: keep local state.
        setSyncStatus(reachable ? 'synced' : 'local');
      }
      // Allow autosave only after the initial load settles.
      hasHydrated.current = true;
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Debounced push of the full app snapshot to the backend after any change.
  useEffect(() => {
    if (!hasHydrated.current) return;
    const snapshot = { profile, savedColleges, finalFive, timelineTasks, essays, campusVisits };
    setSyncStatus('syncing');
    const timer = setTimeout(async () => {
      const ok = await saveRemoteState(snapshot);
      setSyncStatus(ok ? 'synced' : 'offline');
    }, 1000);
    return () => clearTimeout(timer);
  }, [profile, savedColleges, finalFive, timelineTasks, essays, campusVisits]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleSaveCollege = (collegeId: string) => {
    setSavedColleges(prev => 
      prev.includes(collegeId) ? prev.filter(id => id !== collegeId) : [...prev, collegeId]
    );
  };

  const addToFinalFive = (collegeId: string, category: 'Safety' | 'Target' | 'Reach' = 'Target') => {
    setFinalFive(prev => {
      if (prev.some(item => item.collegeId === collegeId)) return prev;
      if (prev.length >= 5) {
        alert("You already have 5 schools in your Final Application Package. You can remove or replace one to add a new school.");
        return prev;
      }
      const newItem: FinalFiveItem = {
        collegeId,
        applicationType: 'EA',
        status: 'researching',
        category,
        targetMajor: profile.intendedMajors[0] || 'Direct-Entry BSN',
        notes: '',
        checklist: {
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
          portalLoginCreated: false
        }
      };
      return [...prev, newItem];
    });
  };

  const removeFromFinalFive = (collegeId: string) => {
    setFinalFive(prev => prev.filter(item => item.collegeId !== collegeId));
  };

  const updateFinalFiveItem = (collegeId: string, updates: Partial<FinalFiveItem>) => {
    setFinalFive(prev => prev.map(item => item.collegeId === collegeId ? { ...item, ...updates } : item));
  };

  const toggleFinalFiveChecklist = (collegeId: string, itemKey: keyof FinalFiveItem['checklist']) => {
    setFinalFive(prev => prev.map(item => {
      if (item.collegeId !== collegeId) return item;
      const updatedChecklist = {
        ...item.checklist,
        [itemKey]: !item.checklist[itemKey]
      };
      
      // Auto-update status if application submitted
      let updatedStatus = item.status;
      if (itemKey === 'applicationSubmitted' && updatedChecklist.applicationSubmitted) {
        updatedStatus = 'submitted';
      }
      
      return {
        ...item,
        checklist: updatedChecklist,
        status: updatedStatus
      };
    }));
  };

  const toggleTaskCompleted = (taskId: string) => {
    setTimelineTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addCustomTask = (taskData: Omit<TimelineTask, 'id' | 'isCustom'>) => {
    const newTask: TimelineTask = {
      ...taskData,
      id: `custom_${Date.now()}`,
      isCustom: true
    };
    setTimelineTasks(prev => [newTask, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTimelineTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const saveEssay = (essay: EssayDraft) => {
    setEssays(prev => {
      const idx = prev.findIndex(e => e.id === essay.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...essay, lastEdited: new Date().toISOString().split('T')[0] };
        return next;
      }
      return [{ ...essay, lastEdited: new Date().toISOString().split('T')[0] }, ...prev];
    });
  };

  const deleteEssay = (essayId: string) => {
    setEssays(prev => prev.filter(e => e.id !== essayId));
  };

  const saveCampusVisit = (visit: CampusVisit) => {
    setCampusVisits(prev => {
      const idx = prev.findIndex(v => v.id === visit.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = visit;
        return next;
      }
      return [visit, ...prev];
    });
  };

  const deleteCampusVisit = (visitId: string) => {
    setCampusVisits(prev => prev.filter(v => v.id !== visitId));
  };

  const loadSampleData = () => {
    setProfile(SAMPLE_STUDENT_PROFILE);
    setFinalFive(SAMPLE_FINAL_FIVE);
    setTimelineTasks(DEFAULT_TIMELINE_TASKS);
    setEssays(SAMPLE_ESSAYS);
    setSavedColleges(['case_western', 'pitt', 'villanova', 'upenn', 'slu', 'emory', 'osu']);
  };

  const resetAllData = () => {
    setProfile(defaultEmptyProfile);
    setFinalFive([]);
    setTimelineTasks(DEFAULT_TIMELINE_TASKS.map(t => ({ ...t, completed: false })));
    setEssays([]);
    setCampusVisits([]);
    setSavedColleges([]);
  };

  const exportDataJSON = () => {
    const backup = {
      profile,
      savedColleges,
      finalFive,
      timelineTasks,
      essays,
      campusVisits,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);

      // Validate the overall shape before applying anything, so a malformed
      // backup can never partially corrupt the current state.
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;

      const isObject = (v: unknown) => typeof v === 'object' && v !== null && !Array.isArray(v);
      if ('profile' in parsed && !isObject(parsed.profile)) return false;
      if ('savedColleges' in parsed && !Array.isArray(parsed.savedColleges)) return false;
      if ('finalFive' in parsed && !Array.isArray(parsed.finalFive)) return false;
      if ('timelineTasks' in parsed && !Array.isArray(parsed.timelineTasks)) return false;
      if ('essays' in parsed && !Array.isArray(parsed.essays)) return false;
      if ('campusVisits' in parsed && !Array.isArray(parsed.campusVisits)) return false;

      // Must contain at least one recognized section to count as a valid backup.
      const knownKeys = ['profile', 'savedColleges', 'finalFive', 'timelineTasks', 'essays', 'campusVisits'];
      if (!knownKeys.some(key => key in parsed)) return false;

      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.savedColleges) setSavedColleges(parsed.savedColleges);
      if (parsed.finalFive) setFinalFive(parsed.finalFive);
      if (parsed.timelineTasks) setTimelineTasks(parsed.timelineTasks);
      if (parsed.essays) setEssays(parsed.essays);
      if (parsed.campusVisits) setCampusVisits(parsed.campusVisits);
      return true;
    } catch (e) {
      console.error("Failed to import JSON data", e);
      return false;
    }
  };

  // Analytics
  const completedTasksCount = timelineTasks.filter(t => t.completed).length;
  
  // Calculate holistic junior year readiness score (0-100)
  const calculateReadinessScore = (): number => {
    let score = 0;
    // 1. Academics & GPA set (max 20 pts)
    if (profile.unweightedGpa >= 3.5) score += 15;
    if (profile.weightedGpa >= 4.0) score += 5;
    
    // 2. Testing path (max 15 pts)
    if (profile.satScore || profile.actScore || profile.psatScore) score += 15;
    
    // 3. Clinical & Volunteer hours (max 20 pts)
    if (profile.clinicalHours >= 50) score += 15;
    else if (profile.clinicalHours > 10) score += 10;
    if (profile.communityServiceHours >= 40) score += 5;

    // 4. Extracurriculars & Leadership (max 15 pts)
    if (profile.extracurriculars.length >= 3) score += 15;
    else if (profile.extracurriculars.length >= 1) score += 8;

    // 5. Final 5 Schools Selected (max 15 pts)
    if (finalFive.length === 5) score += 15;
    else score += finalFive.length * 3;

    // 6. Essay Drafted (max 15 pts)
    if (essays.length > 0) score += 15;

    return Math.min(100, Math.round(score));
  };

  const readinessScore = calculateReadinessScore();

  const finalFiveCompletionPercent = (collegeId: string): number => {
    const item = finalFive.find(f => f.collegeId === collegeId);
    if (!item) return 0;
    const checks = Object.values(item.checklist);
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  };

  return (
    <AppContext.Provider
      value={{
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
        loadSampleData,
        resetAllData,
        exportDataJSON,
        importDataJSON,
        colleges: COLLEGES_DATABASE,
        syncStatus,
        readinessScore,
        completedTasksCount,
        finalFiveCompletionPercent
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
