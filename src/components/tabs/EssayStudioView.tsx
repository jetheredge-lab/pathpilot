import React, { useState } from 'react';
import { 
  PenTool, 
  BookOpen, 
  Mail, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  Plus, 
  Trash2, 
  Save, 
  FileText, 
  Lightbulb, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EssayDraft } from '../../types';
import { COMMON_APP_PROMPTS, SUPPLEMENTAL_TEMPLATES, RECOMMENDATION_EMAIL_TEMPLATE } from '../../data/essayPrompts';
import { Modal } from '../common/Modal';

export const EssayStudioView: React.FC = () => {
  const { profile, essays, saveEssay, deleteEssay, finalFive, colleges } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'common_app' | 'supplementals' | 'recommendation_request'>('common_app');
  const [selectedPromptId, setSelectedPromptId] = useState<number>(1);
  const [activeEssayId, setActiveEssayId] = useState<string>(essays[0]?.id || 'new');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form states for active essay draft
  const currentDraft = essays.find(e => e.id === activeEssayId) || {
    id: `essay_${Date.now()}`,
    title: 'Common App Personal Statement',
    type: 'common_app' as const,
    promptText: COMMON_APP_PROMPTS[0].prompt,
    targetWordCount: 650,
    currentDraft: '',
    outline: '',
    status: 'first_draft' as const,
    lastEdited: new Date().toISOString().split('T')[0]
  };

  const [draftTitle, setDraftTitle] = useState(currentDraft.title);
  const [draftText, setDraftText] = useState(currentDraft.currentDraft);
  const [draftOutline, setDraftOutline] = useState(currentDraft.outline);
  const [draftStatus, setDraftStatus] = useState(currentDraft.status);

  // When switching essays
  const handleSelectEssay = (essay: EssayDraft) => {
    setActiveEssayId(essay.id);
    setDraftTitle(essay.title);
    setDraftText(essay.currentDraft);
    setDraftOutline(essay.outline);
    setDraftStatus(essay.status);
  };

  const handleCreateNewEssay = (type: EssayDraft['type'], title: string, prompt: string, words = 650) => {
    const newEssay: EssayDraft = {
      id: `essay_${Date.now()}`,
      title,
      type,
      promptText: prompt,
      targetWordCount: words,
      currentDraft: '',
      outline: '',
      status: 'brainstorming',
      lastEdited: new Date().toISOString().split('T')[0]
    };
    saveEssay(newEssay);
    handleSelectEssay(newEssay);
  };

  const handleSaveCurrentDraft = () => {
    const updated: EssayDraft = {
      ...currentDraft,
      title: draftTitle,
      currentDraft: draftText,
      outline: draftOutline,
      status: draftStatus,
      lastEdited: new Date().toISOString().split('T')[0]
    };
    saveEssay(updated);
    alert('Essay saved successfully!');
  };

  const wordCount = draftText.trim() ? draftText.trim().split(/\s+/).length : 0;
  const currentPrompt = COMMON_APP_PROMPTS.find(p => p.id === selectedPromptId) || COMMON_APP_PROMPTS[0];

  // Customized teacher recommendation request letter
  const earliestCollege = finalFive.length > 0 
    ? colleges.find(c => c.id === finalFive[0].collegeId) 
    : null;
  const earliestDeadline = earliestCollege?.deadlines.earlyAction || 'November 1st';

  const personalizedRecLetter = RECOMMENDATION_EMAIL_TEMPLATE
    .replace('[Student Full Name]', profile.fullName || '[Your Son\'s Name]')
    .replace('[Grad Year]', String(profile.gradYear || 2028))
    .replace('[Pre-Med / Direct-Entry Nursing / Healthcare]', profile.careerGoal === 'crna' ? 'Direct-Entry Nursing (BSN) and Nurse Anesthesia (CRNA)' : 'Pre-Medical Sciences and Anesthesiology (MD/DO)')
    .replace('[Date, e.g., November 1st]', earliestDeadline);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-semibold mb-2">
              <PenTool className="w-3.5 h-3.5 text-purple-600" />
              <span>Application Writing & Recommendation Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Essays, Prompts & Recommendation Letters
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Craft standout personal statements, explore medical/nursing essay brainstorming guides, and generate professional recommendation request letters for 11th grade teachers.
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleCreateNewEssay('common_app', 'New Common App Draft', currentPrompt.prompt, 650)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Essay Draft</span>
            </button>
          </div>
        </div>

        {/* Studio Sub-Navigation */}
        <div className="flex space-x-2 mt-6 pt-6 border-t border-slate-200">
          <button
            onClick={() => setActiveSubTab('common_app')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeSubTab === 'common_app'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ✍️ Common App 7 Prompts & Workspace
          </button>
          <button
            onClick={() => setActiveSubTab('supplementals')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeSubTab === 'supplementals'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🩺 Why Nursing / Why Pre-Med Supplemental Guides
          </button>
          <button
            onClick={() => setActiveSubTab('recommendation_request')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeSubTab === 'recommendation_request'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ✉️ Teacher Recommendation Request Letter Kit
          </button>
        </div>
      </div>

      {/* COMMON APP ESSAY WORKSPACE */}
      {activeSubTab === 'common_app' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (5 Cols): Prompt Selector & Brainstorming Guide */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Prompt Selector Dropdown */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <label className="text-xs font-bold text-slate-900 block">Select Common App Prompt (1 of 7):</label>
              <select
                value={selectedPromptId}
                onChange={(e) => setSelectedPromptId(parseInt(e.target.value))}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-slate-50"
              >
                {COMMON_APP_PROMPTS.map(p => (
                  <option key={p.id} value={p.id}>
                    Prompt {p.id}: {p.category}
                  </option>
                ))}
              </select>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
                  Official Prompt Text:
                </span>
                <p className="text-xs text-slate-800 italic leading-relaxed">
                  "{currentPrompt.prompt}"
                </p>
              </div>
            </div>

            {/* Healthcare Specific Guidance Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-brand-700">
                <Lightbulb className="w-4 h-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider">Pre-Med & Nursing Brainstorming Angle:</h3>
              </div>

              <div className="p-3.5 bg-brand-50 rounded-2xl border border-brand-100 text-xs text-brand-900 leading-relaxed">
                {currentPrompt.tipsForPreMedAndNursing}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Diagnostic Questions to Ask Yourself:</h4>
                <div className="space-y-2">
                  {currentPrompt.brainstormQuestions.map((q, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Saved Drafts Quick Switcher */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 mb-3">Your Essay Drafts:</h4>
              <div className="space-y-2">
                {essays.map(e => (
                  <div
                    key={e.id}
                    onClick={() => handleSelectEssay(e)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-colors flex items-center justify-between ${
                      e.id === activeEssayId 
                        ? 'bg-purple-50 border-purple-300' 
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{e.title}</h5>
                      <span className="text-[10px] text-slate-500">{e.status} • {e.targetWordCount} words</span>
                    </div>
                    <button
                      onClick={(evt) => {
                        evt.stopPropagation();
                        if (window.confirm("Delete this essay draft?")) deleteEssay(e.id);
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (7 Cols): Live Writing Studio */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            
            {/* Top Toolbar (Title, Status, Word Count) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
              <input
                type="text"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="text-base font-black text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0 w-full sm:w-80"
                placeholder="Draft Title..."
              />

              <div className="flex items-center space-x-3">
                <select
                  value={draftStatus}
                  onChange={(e) => setDraftStatus(e.target.value as any)}
                  className="text-xs font-bold py-1 px-2.5 rounded-lg border border-slate-300 bg-slate-50"
                >
                  <option value="brainstorming">Brainstorming</option>
                  <option value="outline">Outline</option>
                  <option value="first_draft">First Draft</option>
                  <option value="polishing">Polishing</option>
                  <option value="final">Final / Ready</option>
                </select>

                <div className={`px-3 py-1 rounded-full text-xs font-black ${
                  wordCount > 650 ? 'bg-rose-100 text-rose-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {wordCount} / {currentDraft.targetWordCount || 650} Words
                </div>
              </div>
            </div>

            {/* Outline Box (Collapsible) */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Essay Outline & Structural Beats:
              </label>
              <textarea
                rows={2}
                value={draftOutline}
                onChange={(e) => setDraftOutline(e.target.value)}
                placeholder="1. Hook: In the OR observing anesthesia...\n2. Body: Learning patient empathy...\n3. Conclusion: Passion for acute care."
                className="w-full text-xs p-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-white"
              />
            </div>

            {/* Main Draft Editor */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Full Essay Draft:
              </label>
              <textarea
                rows={14}
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                placeholder="Start typing your essay draft here..."
                className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-300 focus:ring-2 focus:ring-purple-500 bg-slate-50 leading-relaxed font-sans"
              />
            </div>

            {/* Footer Action */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                Auto-saved in local browser storage
              </span>
              <button
                onClick={handleSaveCurrentDraft}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUPPLEMENTALS STUDIO */}
      {activeSubTab === 'supplementals' && (
        <div className="space-y-6">
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-indigo-900">Why Pre-Med & Direct-Entry Nursing Supplemental Frameworks</h2>
            <p className="text-xs text-indigo-800 mt-1">
              Top universities and nursing colleges (e.g. Case Western, Penn, Villanova, Pitt) require school-specific short essays. Use these frameworks to structure winning responses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPLEMENTAL_TEMPLATES.map(temp => (
              <div key={temp.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 uppercase">
                      ~{temp.typicalWordCount} Words
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mt-3">{temp.title}</h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{temp.guidance}</p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <h4 className="text-[11px] font-bold text-slate-900 mb-2">Proven Outline Structure:</h4>
                    <div className="space-y-1.5">
                      {temp.outlineStructure.map((step, sIdx) => (
                        <div key={sIdx} className="text-xs text-slate-700 flex items-start space-x-2 bg-slate-50 p-2 rounded-lg">
                          <span className="text-indigo-600 font-bold">{sIdx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleCreateNewEssay(
                      'supplemental',
                      temp.title,
                      temp.guidance,
                      temp.typicalWordCount
                    );
                    setActiveSubTab('common_app');
                  }}
                  className="mt-6 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors text-center"
                >
                  Start Drafting in Workspace
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDATION REQUEST KIT */}
      {activeSubTab === 'recommendation_request' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-purple-900">11th Grade Teacher Recommendation Letter Request Kit</h2>
            <p className="text-xs text-purple-800 mt-1">
              In May of junior year, students should formally ask their junior teachers (1 Science + 1 Math/English) for recommendation letters. Use this email and packet template.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Col: Step-by-Step Etiquette Guide */}
            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Recommendation Etiquette Checklist:</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-purple-900 block">1. Ask In Person First (May of Junior Year)</strong>
                  Visit the teacher after school or during office hours. Ask: <em>"Would you feel comfortable writing a strong letter of recommendation for my pre-med/nursing college applications?"</em>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-purple-900 block">2. Follow Up with the Brag Sheet Packet</strong>
                  Immediately email this template packet containing your generated Resume / Brag Sheet so the teacher has specific examples to cite.
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <strong className="text-purple-900 block">3. Remind in September of Senior Year</strong>
                  Send a polite check-in when senior year starts and link them to your Common App counselor portal.
                </div>
              </div>
            </div>

            {/* Right Col: Formatted Email Template with 1-Click Copy */}
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">Customized Request Email Draft</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(personalizedRecLetter);
                    setCopiedEmail(true);
                    setTimeout(() => setCopiedEmail(false), 2000);
                  }}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Copied to Clipboard! ✓' : 'Copy Email Text'}</span>
                </button>
              </div>

              <pre className="text-xs text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {personalizedRecLetter}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
