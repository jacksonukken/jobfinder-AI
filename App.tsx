import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom'; // Using HashRouter merely as a provider if needed, but manual state is simpler for this flow
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Apply from './pages/Apply';
import { Job } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'detail' | 'apply'>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleApply = () => {
    setCurrentPage('apply');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentPage === 'apply') {
      setCurrentPage('detail');
    } else {
      setCurrentPage('home');
      setSelectedJob(null);
    }
  };

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setCurrentPage('home');
      setSelectedJob(null);
    }
  };

  const handleSubmitSuccess = () => {
    setCurrentPage('home');
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      
      <main className="animate-in fade-in duration-300">
        {currentPage === 'home' && (
          <Home onJobSelect={handleJobSelect} />
        )}
        
        {currentPage === 'detail' && selectedJob && (
          <JobDetail 
            job={selectedJob} 
            onBack={handleBack}
            onApply={handleApply}
          />
        )}

        {currentPage === 'apply' && selectedJob && (
          <Apply 
            job={selectedJob} 
            onBack={handleBack}
            onSubmitSuccess={handleSubmitSuccess}
          />
        )}
      </main>
    </div>
  );
}

export default App;
