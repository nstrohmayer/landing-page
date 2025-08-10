import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

export interface Submission {
  id: string;
  idea: string;
  automation: string;
  contact: string;
  timestamp: string;
}

interface SubmissionsContextType {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'timestamp'>) => void;
}

const SubmissionsContext = createContext<SubmissionsContextType | undefined>(undefined);

export const SubmissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const savedSubmissions = window.localStorage.getItem('submissions');
      return savedSubmissions ? JSON.parse(savedSubmissions) : [];
    } catch (error) {
      console.error('Failed to parse submissions from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('submissions', JSON.stringify(submissions));
    } catch (error) {
      console.error('Failed to save submissions to localStorage', error);
    }
  }, [submissions]);

  const addSubmission = (submission: Omit<Submission, 'id' | 'timestamp'>) => {
    const newSubmission: Submission = {
      ...submission,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setSubmissions(prevSubmissions => [newSubmission, ...prevSubmissions]);
  };

  const contextValue = useMemo(() => ({ submissions, addSubmission }), [submissions]);

  return (
    <SubmissionsContext.Provider value={contextValue}>
      {children}
    </SubmissionsContext.Provider>
  );
};

export const useSubmissions = (): SubmissionsContextType => {
  const context = useContext(SubmissionsContext);
  if (context === undefined) {
    throw new Error('useSubmissions must be used within a SubmissionsProvider');
  }
  return context;
};
