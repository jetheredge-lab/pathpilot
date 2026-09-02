import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Copy, 
  Download, 
  Sparkles, 
  CheckCircle, 
  GraduationCap, 
  HeartPulse, 
  Award, 
  Building2,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { jsPDF } from 'jspdf';

export const ResumeBuilderView: React.FC = () => {
  const { profile, finalFive, colleges } = useApp();
  const [resumeMode, setResumeMode] = useState<'standard' | 'bragsheet'>('bragsheet');
  const [copied, setCopied] = useState(false);
  const [customObjective, setCustomObjective] = useState(
    `Dedicated high school junior aiming to pursue a ${profile.careerGoal === 'crna' ? 'Direct-Entry Bachelor of Science in Nursing (BSN)' : 'Pre-Medical / Biological Sciences track'} with long-term aspirations of becoming a ${profile.careerGoal === 'crna' ? 'Certified Registered Nurse Anesthetist (CRNA)' : 'Board-Certified Physician Anesthesiologist (MD)'}. Strong academic background in AP science and mathematics paired with 65+ hours of active hospital clinical volunteering and surgical shadowing.`
  );

  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (!resumeRef.current) return;
    navigator.clipboard.writeText(resumeRef.current.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;
    const doc = new jsPDF({
      unit: 'pt',
      format: 'letter'
    });

    doc.html(resumeRef.current, {
      callback: function (pdf) {
        pdf.save(`${profile.fullName.replace(/\s+/g, '_') || 'Student'}_College_Resume.pdf`);
      },
      x: 20,
      y: 20,
      width: 550,
      windowWidth: 800
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 text-xs font-semibold mb-2">
              <FileText className="w-3.5 h-3.5 text-brand-600" />
              <span>Resume & Counselor Brag Sheet Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              High School Activity Resume & Brag Sheet
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Generate a formatted resume for college admissions, scholarships, or the essential <strong>11th Grade Teacher Recommendation Brag Sheet</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleCopyText}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl flex items-center space-x-2 transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied! ✓' : 'Copy Text'}</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex space-x-3 mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => setResumeMode('bragsheet')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              resumeMode === 'bragsheet'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📋 Counselor & Teacher Recommendation Brag Sheet (Recommended for 11th Grade)
          </button>
          <button
            onClick={() => setResumeMode('standard')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              resumeMode === 'standard'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📄 Standard Academic Activity Resume
          </button>
        </div>
      </div>

      {/* Editable Objective / Intro Note (Hidden on print) */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 print:hidden">
        <label className="text-xs font-bold text-slate-700 block mb-1.5">
          {resumeMode === 'bragsheet' ? 'Brag Sheet Personal Statement & Career Aspirations:' : 'Resume Summary / Objective:'}
        </label>
        <textarea
          rows={3}
          value={customObjective}
          onChange={(e) => setCustomObjective(e.target.value)}
          className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-500 bg-white"
        />
      </div>

      {/* LIVE FORMATTED RESUME / BRAG SHEET PREVIEW */}
      <div 
        ref={resumeRef}
        className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-md max-w-4xl mx-auto text-slate-900 space-y-6 print:shadow-none print:border-none print:p-0"
      >
        
        {/* Document Header */}
        <div className="text-center pb-6 border-b-2 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-slate-900">
            {profile.fullName || 'Student Name'}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-600 mt-2 font-medium">
            <span>{profile.city || 'Austin'}, {profile.state || 'TX'}</span>
            <span>•</span>
            <span>Class of {profile.gradYear} ({profile.currentGrade})</span>
            <span>•</span>
            <span>{profile.highSchool || 'High School'}</span>
          </div>

          {resumeMode === 'bragsheet' && (
            <div className="mt-3 inline-block bg-indigo-50 border border-indigo-200 px-4 py-1 rounded-full text-xs font-bold text-indigo-900">
              Official Counselor & Teacher Letter of Recommendation Packet
            </div>
          )}
        </div>

        {/* Career Goal & Objective */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
            {resumeMode === 'bragsheet' ? 'Intended Field of Study & Career Aspiration' : 'Academic Profile & Objective'}
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{customObjective}</p>
        </div>

        {/* Education & Academic Rigor */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
            Education & Academic Standing
          </h2>

          <div className="flex justify-between items-start text-xs">
            <div>
              <span className="font-bold text-slate-900">{profile.highSchool || 'High School'}</span>
              <p className="text-slate-600">Expected Graduation: May {profile.gradYear}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-900">Unweighted GPA: {profile.unweightedGpa.toFixed(2)} / 4.0</span>
              <p className="text-slate-600">Weighted GPA: {profile.weightedGpa.toFixed(2)}</p>
            </div>
          </div>

          {/* Standardized Testing */}
          <div className="mt-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between">
            <span><strong>SAT Superscore:</strong> {profile.satScore || '1390 (Target: 1480+)'}</span>
            {profile.psatScore && <span><strong>PSAT/NMSQT:</strong> {profile.psatScore}</span>}
            <span><strong>Course Rigor:</strong> {profile.apIbCoursesCount} AP/IB Classes</span>
          </div>

          {/* AP Courses List */}
          {profile.apCourses && profile.apCourses.length > 0 && (
            <div className="mt-2 text-xs text-slate-600">
              <strong>Advanced Coursework: </strong>
              {profile.apCourses.join(' • ')}
            </div>
          )}
        </div>

        {/* Clinical Shadowing & Healthcare Volunteering */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
            Clinical Shadowing & Healthcare Volunteering ({profile.clinicalHours} Total Hours)
          </h2>

          <div className="space-y-3">
            {profile.extracurriculars
              .filter(a => a.category === 'clinical')
              .map(act => (
                <div key={act.id} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{act.title} — {act.organization}</span>
                    <span>{act.grades.join(', ')} | {act.totalHours} Hours</span>
                  </div>
                  <div className="text-slate-600 italic font-medium">{act.roles}</div>
                  <p className="text-slate-700 mt-0.5">{act.description}</p>
                  {act.highlights && (
                    <p className="text-brand-700 font-medium mt-0.5">Key Impact: {act.highlights}</p>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Extracurricular Activities, Leadership & STEM */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
            Extracurricular Leadership & Community Service
          </h2>

          <div className="space-y-3">
            {profile.extracurriculars
              .filter(a => a.category !== 'clinical')
              .map(act => (
                <div key={act.id} className="text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{act.title} — {act.organization}</span>
                    <span>{act.grades.join(', ')} | {act.totalHours} Hours ({act.hoursPerWeek}h/wk)</span>
                  </div>
                  <div className="text-slate-600 italic font-medium">{act.roles}</div>
                  <p className="text-slate-700 mt-0.5">{act.description}</p>
                  {act.highlights && (
                    <p className="text-brand-700 font-medium mt-0.5">Key Impact: {act.highlights}</p>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Honors, Awards & Certifications */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 pb-1 border-b border-slate-300 mb-2">
            Honors, Awards & Healthcare Certifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {profile.awards.map(aw => (
              <div key={aw.id} className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{aw.title}</span>
                  <span className="text-slate-500 text-[10px]">{aw.level}</span>
                </div>
                <p className="text-slate-600 text-[11px] mt-0.5">{aw.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BRAG SHEET EXCLUSIVE: Target College List & Deadlines */}
        {resumeMode === 'bragsheet' && finalFive.length > 0 && (
          <div className="pt-2">
            <h2 className="text-xs font-black uppercase tracking-widest text-indigo-900 pb-1 border-b border-indigo-300 mb-2">
              Prospective College Application Targets & Earliest Deadlines
            </h2>

            <div className="space-y-1.5 text-xs text-slate-700">
              {finalFive.map((item, idx) => {
                const college = colleges.find(c => c.id === item.collegeId);
                if (!college) return null;
                return (
                  <div key={item.collegeId} className="flex justify-between items-center py-1 border-b border-slate-100">
                    <span>
                      <strong>{idx + 1}. {college.name}</strong> ({item.targetMajor})
                    </span>
                    <span className="font-semibold text-slate-600">
                      {item.applicationType} Deadline: {college.deadlines.earlyAction || college.deadlines.regularDecision}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
