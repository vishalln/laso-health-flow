import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface QuizData {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  program: 'weight-loss' | 'diabetes' | 'both';
  conditions: string[];
  medications: string;
  contraindications: string[];
  hba1c: string;
}

export interface BookingData {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  zoomLink: string;
  confirmed: boolean;
}

interface UserState {
  quizCompleted: boolean;
  quizData: QuizData | null;
  selectedProgram: 'weight-loss' | 'diabetes' | 'both';
  booking: BookingData | null;
  isLoggedIn: boolean;
  userName: string;
  setQuizCompleted: (v: boolean) => void;
  setQuizData: (d: QuizData) => void;
  setSelectedProgram: (p: 'weight-loss' | 'diabetes' | 'both') => void;
  setBooking: (b: BookingData) => void;
  setIsLoggedIn: (v: boolean) => void;
  setUserName: (n: string) => void;
}

const UserContext = createContext<UserState | undefined>(undefined);

function loadState<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [quizCompleted, setQuizCompleted] = useState(() => loadState('laso_quizCompleted', false));
  const [quizData, setQuizData] = useState<QuizData | null>(() => loadState('laso_quizData', null));
  const [selectedProgram, setSelectedProgram] = useState<'weight-loss' | 'diabetes' | 'both'>(() => loadState('laso_selectedProgram', 'weight-loss'));
  const [booking, setBooking] = useState<BookingData | null>(() => loadState('laso_booking', null));
  const [isLoggedIn, setIsLoggedIn] = useState(() => loadState('laso_isLoggedIn', false));
  const [userName, setUserName] = useState(() => loadState('laso_userName', 'Arjun'));

  useEffect(() => { localStorage.setItem('laso_quizCompleted', JSON.stringify(quizCompleted)); }, [quizCompleted]);
  useEffect(() => { localStorage.setItem('laso_quizData', JSON.stringify(quizData)); }, [quizData]);
  useEffect(() => { localStorage.setItem('laso_selectedProgram', JSON.stringify(selectedProgram)); }, [selectedProgram]);
  useEffect(() => { localStorage.setItem('laso_booking', JSON.stringify(booking)); }, [booking]);
  useEffect(() => { localStorage.setItem('laso_isLoggedIn', JSON.stringify(isLoggedIn)); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem('laso_userName', JSON.stringify(userName)); }, [userName]);

  return (
    <UserContext.Provider value={{
      quizCompleted, quizData, selectedProgram, booking, isLoggedIn, userName,
      setQuizCompleted, setQuizData, setSelectedProgram, setBooking, setIsLoggedIn, setUserName
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
