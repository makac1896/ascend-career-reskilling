import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle2, Zap, Database, Layers, Box, Globe, Users, FileJson, Cpu, GraduationCap, Building2, UserCircle2, Mail, LayoutTemplate, MonitorPlay, MessageSquare } from 'lucide-react';
import { GlassDNA, GlassHandshake } from './GlassIcons';

interface DesignWorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

// Data Models based on Product Vision
const channels = [
    {
        id: 'faculty',
        title: 'Faculty Upgrade',
        subtitle: 'The Course Injection',
        desc: 'Offer a pre-packaged lab or guest lecture to an existing syllabus.',
        icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
        color: 'bg-purple-50 border-purple-200'
    },
    {
        id: 'student',
        title: 'Direct-to-Student',
        subtitle: 'The Digital Nudge',
        desc: 'Bypass the classroom with a just-in-time micro-credential or guide.',
        icon: <UserCircle2 className="w-6 h-6 text-blue-600" />,
        color: 'bg-blue-50 border-blue-200'
    },
    {
        id: 'career',
        title: 'Career Studio',
        subtitle: 'The Co-Curricular Lab',
        desc: 'Host a high-friction simulation event in the Career Center.',
        icon: <Building2 className="w-6 h-6 text-orange-600" />,
        color: 'bg-orange-50 border-orange-200'
    }
];

const interventionFormats = {
    faculty: [
        { id: 'guest', title: 'Industry Guest Spot', type: 'Live Injection', desc: 'Logistics for a 45-min expert Q&A.', icon: <Users className="w-4 h-4"/> },
        { id: 'assignment', title: 'Assignment Upgrade', type: 'Pedagogy Fix', desc: 'Replace a "Doer" task with an "Auditor" task.', icon: <FileJson className="w-4 h-4"/> }
    ],
    student: [
        { id: 'primer', title: 'Digital Primer', type: 'Async Micro-Course', desc: '20-min interactive module on tool literacy.', icon: <MonitorPlay className="w-4 h-4"/> },
        { id: 'blast', title: 'Strategy Blast', type: 'Email Campaign', desc: 'High-utility PDF guide or cheat sheet.', icon: <Mail className="w-4 h-4"/> }
    ],
    career: [
        { id: 'hackathon', title: 'Studio Sprint', type: 'Live Event', desc: '90-min crisis simulation with alumni.', icon: <Cpu className="w-4 h-4"/> },
        { id: 'showcase', title: 'Demo Day', type: 'High Reward', desc: 'Students present work to employers.', icon: <LayoutTemplate className="w-4 h-4"/> }
    ]
};

const resources = [
  { id: 'partner', title: 'Pfizer: Clinical Data', type: 'Grant Asset', desc: 'Sanitized patient logs for analysis.', available: true },
  { id: 'alum', title: 'Sarah J. (Deloitte)', type: 'Alumni Mentor', desc: 'Available for grading/feedback.', available: true },
  { id: 'market', title: 'Live Job Feed', type: 'API Stream', desc: 'Real-time role requirements.', available: true },
];

const legoModules = [
  { id: 'rubric', title: 'Grading Rubric', desc: 'Grades the process, not just output.' },
  { id: 'guardrails', title: 'AI Rules', desc: 'System prompts to prevent errors.' },
  { id: 'reflection', title: 'Reflection', desc: 'Post-task survey on student control.' },
];

const DesignWorkshopModal: React.FC<DesignWorkshopModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  if (!isOpen) return null;

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
      if (step < totalSteps) {
          setStep(step + 1);
      } else {
          onComplete?.();
      }
  };

  const toggleSelection = (id: string, list: string[], setList: (l: string[]) => void) => {
      if (list.includes(id)) {
          setList(list.filter(item => item !== id));
      } else {
          setList([...list, id]);
      }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-ascend-text/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-ascend-border flex items-center justify-between bg-white">
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="bg-gradient-to-r from-ascend-blue to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Project Builder
                    </span>
                    <span className="text-ascend-subtext text-xs font-bold">Step {step} of {totalSteps}</span>
                </div>
                <h2 className="text-2xl font-bold text-ascend-text">Create Activity</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-6 h-6 text-ascend-subtext" />
            </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100">
            <div 
                className="h-full bg-ascend-blue transition-all duration-500 ease-out shadow-[0_0_10px_rgba(67,24,255,0.5)]"
                style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-10 bg-[#FAFAFA]">
            
            {/* Step 1: Diagnosis */}
            {step === 1 && (
                <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-ascend-text mb-2">The Brief</h3>
                        <p className="text-ascend-subtext">Review the detected gap between Employer Needs and Student Skills.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-8 border border-ascend-border shadow-soft flex items-start gap-8">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 flex flex-col items-center justify-center shrink-0 shadow-inner">
                            <GlassDNA className="w-16 h-16 mb-2" />
                            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Bio-Ethics</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <h4 className="text-2xl font-bold text-ascend-text">Clinical Empathy Gap</h4>
                                <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded-md border border-red-100">Urgent</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-ascend-subtext uppercase block mb-1">What Employers Want</span>
                                    <p className="text-sm font-medium text-ascend-text">Employers need Junior Analysts who can check AI patient logs for bias.</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <span className="text-[10px] font-bold text-ascend-subtext uppercase block mb-1">Student Reality</span>
                                    <p className="text-sm font-medium text-ascend-text">Students are using AI passively to write papers without checking facts.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="flex items-center gap-2 text-xs font-bold text-ascend-subtext bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                                    <Globe className="w-3.5 h-3.5" /> Source: Pfizer
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-ascend-subtext bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                                    <Users className="w-3.5 h-3.5" /> Impact: 850 Students
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Customer & Format */}
            {step === 2 && (
                <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-ascend-text mb-2">Project Plan</h3>
                        <p className="text-ascend-subtext">How do we want to solve this?</p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                        {channels.map((c) => (
                            <div 
                                key={c.id}
                                onClick={() => { setSelectedChannel(c.id); setSelectedFormat(null); }}
                                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${
                                    selectedChannel === c.id 
                                    ? `border-ascend-blue bg-white shadow-glow ring-1 ring-ascend-blue` 
                                    : 'border-white bg-white shadow-sm hover:border-gray-200'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${c.color}`}>
                                    {c.icon}
                                </div>
                                <h4 className="font-bold text-ascend-text text-lg mb-1">{c.title}</h4>
                                <span className="text-xs font-bold text-ascend-subtext uppercase tracking-wide block mb-3">{c.subtitle}</span>
                                <p className="text-xs text-ascend-subtext leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>

                    {selectedChannel && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h5 className="font-bold text-ascend-text text-sm uppercase tracking-wide mb-4 text-center">Select Format</h5>
                            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {/* @ts-ignore */}
                                {interventionFormats[selectedChannel].map((f: any) => (
                                    <div 
                                        key={f.id}
                                        onClick={() => setSelectedFormat(f.id)}
                                        className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
                                            selectedFormat === f.id
                                            ? 'bg-ascend-text text-white shadow-lg border-ascend-text'
                                            : 'bg-white border-ascend-border hover:border-gray-300 text-ascend-text'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-lg mr-3 ${selectedFormat === f.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                            {f.icon}
                                        </div>
                                        <div>
                                            <h6 className="font-bold text-sm">{f.title}</h6>
                                            <p className={`text-xs ${selectedFormat === f.id ? 'text-gray-300' : 'text-ascend-subtext'}`}>{f.desc}</p>
                                        </div>
                                        {selectedFormat === f.id && <CheckCircle2 className="w-5 h-5 ml-auto text-green-400" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 3: Resources (The Grant) */}
            {step === 3 && (
                <div className="max-w-3xl mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="text-center mb-10">
                        <h3 className="text-3xl font-bold text-ascend-text mb-2">Resources</h3>
                        <p className="text-ascend-subtext">Add real-world assets to this project.</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-ascend-border shadow-sm overflow-hidden">
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-ascend-subtext uppercase tracking-wider">Available Assets</span>
                            <span className="text-xs font-bold text-ascend-blue bg-blue-50 px-2 py-1 rounded-md">3 Matches Found</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {resources.map((r) => (
                                <div 
                                    key={r.id}
                                    onClick={() => toggleSelection(r.id, selectedResources, setSelectedResources)}
                                    className={`p-5 flex items-center cursor-pointer transition-colors ${selectedResources.includes(r.id) ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="mr-4">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedResources.includes(r.id) ? 'bg-ascend-blue border-ascend-blue' : 'border-gray-300 bg-white'}`}>
                                            {selectedResources.includes(r.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h5 className="font-bold text-ascend-text text-sm">{r.title}</h5>
                                            <span className="text-[10px] font-bold text-ascend-subtext bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{r.type}</span>
                                        </div>
                                        <p className="text-xs text-ascend-subtext">{r.desc}</p>
                                    </div>
                                    {r.id === 'partner' && <GlassHandshake className="w-8 h-8 opacity-80" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: Blueprint (The Stack) */}
            {step === 4 && (
                <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 fade-in duration-300">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-ascend-text mb-2">The Blueprint</h3>
                        <p className="text-ascend-subtext">Configure the tools for the {selectedFormat ? 'selected activity' : 'activity'}.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Selected Stack Visual */}
                        <div className="bg-white rounded-2xl border border-ascend-border shadow-sm p-6 flex flex-col">
                            <h5 className="font-bold text-ascend-text mb-4 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-ascend-blue" />
                                Activity Stack
                            </h5>
                            
                            <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-200 p-4 space-y-3">
                                {/* Base Layer */}
                                <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-3 opacity-60">
                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center"><Box className="w-4 h-4 text-gray-400"/></div>
                                    <div>
                                        <span className="block text-xs font-bold text-gray-500">Core Content</span>
                                        <span className="block text-[10px] text-gray-400">Base Knowledge</span>
                                    </div>
                                </div>
                                
                                {/* Dynamic Layers */}
                                {selectedModules.map(mId => {
                                    const mod = legoModules.find(l => l.id === mId);
                                    return (
                                        <div key={mId} className="p-3 bg-white border-l-4 border-l-ascend-blue border-y border-r border-gray-200 rounded-r-lg shadow-sm flex items-center gap-3 animate-in slide-in-from-left-2">
                                            <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center"><Zap className="w-4 h-4 text-ascend-blue"/></div>
                                            <div>
                                                <span className="block text-xs font-bold text-ascend-text">{mod?.title}</span>
                                                <span className="block text-[10px] text-ascend-subtext">Module Active</span>
                                            </div>
                                        </div>
                                    )
                                })}

                                {selectedModules.length === 0 && (
                                    <div className="h-20 flex items-center justify-center text-xs text-gray-400 font-medium italic">
                                        Add modules from the library...
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Module Library */}
                        <div>
                             <h5 className="font-bold text-xs text-ascend-subtext uppercase tracking-wider mb-4">Module Library</h5>
                             <div className="space-y-3">
                                {legoModules.map((mod) => (
                                    <div 
                                        key={mod.id}
                                        onClick={() => toggleSelection(mod.id, selectedModules, setSelectedModules)}
                                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                            selectedModules.includes(mod.id)
                                            ? 'bg-ascend-blue text-white shadow-md border-ascend-blue'
                                            : 'bg-white border-ascend-border hover:border-ascend-blue hover:shadow-sm text-ascend-text'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm">{mod.title}</span>
                                            {selectedModules.includes(mod.id) ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Box className="w-4 h-4 text-gray-300" />}
                                        </div>
                                        <p className={`text-xs ${selectedModules.includes(mod.id) ? 'text-blue-100' : 'text-ascend-subtext'}`}>
                                            {mod.desc}
                                        </p>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-ascend-border bg-white flex justify-between items-center z-20">
            <button 
                onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                className="flex items-center gap-2 text-sm font-bold text-ascend-subtext hover:text-ascend-text px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                {step === 1 ? 'Cancel' : 'Back'}
            </button>

            <button 
                onClick={handleNext}
                disabled={step === 2 && !selectedFormat}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white shadow-lg transition-all ${
                    (step === 2 && !selectedFormat) 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-ascend-blue hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95'
                }`}
            >
                {step === totalSteps ? (
                    <>Launch Project <Zap className="w-4 h-4" /></>
                ) : (
                    <>Continue <ArrowRight className="w-4 h-4" /></>
                )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default DesignWorkshopModal;