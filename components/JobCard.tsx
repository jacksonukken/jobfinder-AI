import React from 'react';
import { MapPin, Clock, DollarSign, Building } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <img 
          src={job.logoUrl} 
          alt={job.company} 
          className="w-12 h-12 rounded-lg object-cover bg-slate-100"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {job.title}
          </h3>
          <p className="text-slate-600 font-medium">{job.company}</p>
          
          <div className="mt-4 flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              {job.location} {job.isRemote && <span className="text-indigo-600 font-medium">(Remote)</span>}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              {job.salaryRange}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {job.type}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {job.requirements.slice(0, 3).map((req, i) => (
              <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
