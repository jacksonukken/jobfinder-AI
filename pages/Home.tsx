import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, Briefcase } from 'lucide-react';
import { Job, SearchFilters } from '../types';
import JobCard from '../components/JobCard';
import { searchJobsWithGemini } from '../services/gemini';

interface HomeProps {
  onJobSelect: (job: Job) => void;
}

const Home: React.FC<HomeProps> = ({ onJobSelect }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setSearched(true);
    const results = await searchJobsWithGemini(query, location);
    setJobs(results);
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 pb-24 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Find your dream job with <span className="text-indigo-200">AI</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Search for opportunities and let our AI assistant help you craft the perfect application in seconds.
          </p>
          
          <div className="mt-10 max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-2 bg-slate-50 rounded-xl">
                <Search className="text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full ml-3 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-2 bg-slate-50 rounded-xl">
                <MapPin className="text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="City, state, or 'Remote'"
                  className="w-full ml-3 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  'Searching...'
                ) : (
                  <>Search <Sparkles size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[400px] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {searched ? 'Recommended Opportunities' : 'Trending Jobs'}
            </h2>
            <span className="text-slate-500 text-sm">{jobs.length} results found</span>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-slate-100 rounded-xl h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {jobs.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} onClick={onJobSelect} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Briefcase className="mx-auto h-12 w-12 text-slate-300" />
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">No jobs found</h3>
                  <p className="mt-1 text-sm text-slate-500">Try adjusting your search terms or location.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
