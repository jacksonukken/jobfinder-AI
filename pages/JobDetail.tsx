import React from 'react';
import { ArrowLeft, MapPin, Building, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { Job } from '../types';

interface JobDetailProps {
  job: Job;
  onBack: () => void;
  onApply: () => void;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onBack, onApply }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-6">
              <img 
                src={job.logoUrl} 
                alt={job.company} 
                className="w-20 h-20 rounded-xl object-cover bg-slate-50"
              />
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-lg text-slate-600 font-medium">
                  <Building size={20} />
                  {job.company}
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={18} />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={18} />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={18} />
                    {job.salaryRange}
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={onApply}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {job.description}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
            <ul className="grid gap-3">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">About {job.company}</h3>
            <p className="text-slate-600 text-sm">
              We are a forward-thinking company dedicated to innovation and excellence. 
              Join our team to make a real impact in the industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
