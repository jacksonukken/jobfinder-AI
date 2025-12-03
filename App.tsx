import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import Apply from './pages/Apply';
import { Job } from './types';
import { auth, signInWithGoogle, logout } from './services/firebase';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'detail' | 'apply'>('home');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
      <Navbar 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      
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
            user={user}
          />
        )}
      </main>
    </div>
  );
}

export default App;