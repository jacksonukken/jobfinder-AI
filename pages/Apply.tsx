import React, { useState } from 'react';
import { ArrowLeft, Wand2, Send, FileText, Loader2, CheckCircle, UploadCloud } from 'lucide-react';
import { Job, UserProfile } from '../types';
import { generateCoverLetter } from '../services/gemini';

interface ApplyProps {
  job: Job;
  onBack: () => void;
  onSubmitSuccess: () => void;
}

const Apply: React.FC<ApplyProps> = ({ job, onBack, onSubmitSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    experience: '',
    skills: ''
  });

  const [coverLetter, setCoverLetter] = useState('');

  const handleGenerateCoverLetter = async () => {
    if (!profile.name || !profile.experience || !profile.skills) {
      alert("Please fill in your details first to generate a tailored cover letter.");
      return;
    }
    setGenerating(true);
    const letter = await generateCoverLetter(job, profile);
    setCoverLetter(letter);
    setGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Sent!</h2>
          <p className="text-slate-600 mb-8">
            Your application for <span className="font-semibold text-slate-900">{job.title}</span> at {job.company} has been submitted successfully.
          </p>
          <button 
            onClick={onSubmitSuccess}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Find More Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Cancel Application
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-indigo-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">Apply for {job.title}</h1>
            <p className="text-indigo-100 mt-1">{job.company}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Info */}
            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                1. Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Resume / CV</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50 group">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative font-medium text-indigo-600 hover:text-indigo-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Key Skills</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  value={profile.skills}
                  onChange={(e) => setProfile({...profile, skills: e.target.value})}
                  placeholder="React, TypeScript, Tailwind, Node.js..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Experience Summary</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                  placeholder="5 years of experience in frontend development, leading teams..."
                />
              </div>
            </section>

            <hr className="border-slate-100" />

            {/* AI Cover Letter */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  2. Cover Letter
                </h3>
                <button
                  type="button"
                  onClick={handleGenerateCoverLetter}
                  disabled={generating}
                  className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50"
                >
                  {generating ? <Loader2 className="animate-spin h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
                  Generate with AI
                </button>
              </div>
              
              <div className="relative">
                <textarea
                  rows={12}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none font-mono text-sm leading-relaxed"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Click 'Generate with AI' to create a custom cover letter based on your profile and the job description..."
                />
                {!coverLetter && !generating && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="text-slate-400 flex items-center gap-2">
                      <FileText size={20} />
                      AI will draft your letter here
                    </p>
                  </div>
                )}
              </div>
            </section>

            <div className="pt-4 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send size={18} />}
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Apply;