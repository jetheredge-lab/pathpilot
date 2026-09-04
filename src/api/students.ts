// Client for the RoundsAhead per-student REST API. Auth is the httpOnly session
// cookie, so every call uses credentials: 'include'.
import { StudentProfile, FinalFiveItem, TimelineTask, EssayDraft, CampusVisit, AwardLetter, CourseEntry } from '../types';

const API = '/api';

export interface StudentSummary {
  id: string;
  fullName: string;
  gradYear: number;
  currentGrade: string;
  updatedAt: string;
}

export interface StudentBundle {
  profile: StudentProfile;
  savedColleges: string[];
  finalFive: FinalFiveItem[];
  timelineTasks: TimelineTask[];
  essays: EssayDraft[];
  campusVisits: CampusVisit[];
  awardLetters: AwardLetter[];
  courseEntries: CourseEntry[];
}

interface Res<T = any> {
  ok: boolean;
  json: T;
}

async function req<T = any>(path: string, options: RequestInit = {}): Promise<Res<T>> {
  try {
    const res = await fetch(`${API}${path}`, {
      credentials: 'include',
      headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
      ...options,
    });
    const json = await res.json().catch(() => ({}));
    return { ok: res.ok, json };
  } catch {
    return { ok: false, json: {} as T };
  }
}

// ── Students ──
export async function listStudents(): Promise<StudentSummary[]> {
  const { ok, json } = await req<{ students: StudentSummary[] }>('/students');
  return ok ? json.students : [];
}

export async function createStudent(seed: Partial<StudentBundle> = {}): Promise<StudentBundle | null> {
  const { ok, json } = await req<StudentBundle>('/students', { method: 'POST', body: JSON.stringify(seed) });
  return ok ? json : null;
}

export async function getStudent(id: string): Promise<StudentBundle | null> {
  const { ok, json } = await req<StudentBundle>(`/students/${id}`);
  return ok ? json : null;
}

export function patchProfile(id: string, updates: Partial<StudentProfile>): Promise<Res> {
  return req(`/students/${id}`, { method: 'PATCH', body: JSON.stringify(updates) });
}

export function deleteStudent(id: string): Promise<Res> {
  return req(`/students/${id}`, { method: 'DELETE' });
}

export async function replaceState(id: string, bundle: Partial<StudentBundle>): Promise<StudentBundle | null> {
  const { ok, json } = await req<StudentBundle>(`/students/${id}/state`, {
    method: 'PUT',
    body: JSON.stringify(bundle),
  });
  return ok ? json : null;
}

// ── Saved colleges ──
export function addSavedCollege(id: string, collegeId: string): Promise<Res> {
  return req(`/students/${id}/saved-colleges`, { method: 'POST', body: JSON.stringify({ collegeId }) });
}
export function removeSavedCollege(id: string, collegeId: string): Promise<Res> {
  return req(`/students/${id}/saved-colleges/${collegeId}`, { method: 'DELETE' });
}

// ── Final five ──
export function addFinalFive(id: string, collegeId: string, category: string, targetMajor: string): Promise<Res> {
  return req(`/students/${id}/final-five`, { method: 'POST', body: JSON.stringify({ collegeId, category, targetMajor }) });
}
export function patchFinalFive(id: string, collegeId: string, updates: Partial<FinalFiveItem>): Promise<Res> {
  return req(`/students/${id}/final-five/${collegeId}`, { method: 'PATCH', body: JSON.stringify(updates) });
}
export function removeFinalFive(id: string, collegeId: string): Promise<Res> {
  return req(`/students/${id}/final-five/${collegeId}`, { method: 'DELETE' });
}

// ── Tasks / essays / visits (upsert by client id) ──
export function putTask(id: string, task: TimelineTask): Promise<Res> {
  return req(`/students/${id}/tasks/${task.id}`, { method: 'PUT', body: JSON.stringify(task) });
}
export function deleteTaskApi(id: string, taskId: string): Promise<Res> {
  return req(`/students/${id}/tasks/${taskId}`, { method: 'DELETE' });
}
export function putEssay(id: string, essay: EssayDraft): Promise<Res> {
  return req(`/students/${id}/essays/${essay.id}`, { method: 'PUT', body: JSON.stringify(essay) });
}
export function deleteEssayApi(id: string, essayId: string): Promise<Res> {
  return req(`/students/${id}/essays/${essayId}`, { method: 'DELETE' });
}
export function putCampusVisit(id: string, visit: CampusVisit): Promise<Res> {
  return req(`/students/${id}/campus-visits/${visit.id}`, { method: 'PUT', body: JSON.stringify(visit) });
}
export function deleteCampusVisitApi(id: string, visitId: string): Promise<Res> {
  return req(`/students/${id}/campus-visits/${visitId}`, { method: 'DELETE' });
}
export function putAwardLetter(id: string, letter: AwardLetter): Promise<Res> {
  return req(`/students/${id}/award-letters/${letter.id}`, { method: 'PUT', body: JSON.stringify(letter) });
}
export function deleteAwardLetterApi(id: string, letterId: string): Promise<Res> {
  return req(`/students/${id}/award-letters/${letterId}`, { method: 'DELETE' });
}
export function putCourseEntry(id: string, course: CourseEntry): Promise<Res> {
  return req(`/students/${id}/courses/${course.id}`, { method: 'PUT', body: JSON.stringify(course) });
}
export function deleteCourseEntryApi(id: string, courseId: string): Promise<Res> {
  return req(`/students/${id}/courses/${courseId}`, { method: 'DELETE' });
}
