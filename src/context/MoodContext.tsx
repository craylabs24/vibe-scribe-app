
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodEntry, MoodLevel } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface MoodContextType {
  entries: MoodEntry[];
  addEntry: (mood: MoodLevel, note?: string, activities?: string[]) => void;
  updateEntry: (id: string, updates: Partial<Omit<MoodEntry, 'id' | 'date'>>) => void;
  deleteEntry: (id: string) => void;
  getEntriesByDate: (date: string) => MoodEntry | undefined;
  getLastWeekEntries: () => MoodEntry[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMoodContext = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (mood: MoodLevel, note?: string, activities?: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    const existingEntryForToday = entries.find(entry => entry.date === today);

    if (existingEntryForToday) {
      updateEntry(existingEntryForToday.id, { mood, note, activities });
      toast({
        title: "Mood updated",
        description: "Your mood for today has been updated",
      });
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: today,
      mood,
      note,
      activities,
    };

    setEntries(prev => [newEntry, ...prev]);
    toast({
      title: "Mood logged",
      description: "Your mood has been recorded for today",
    });
  };

  const updateEntry = (id: string, updates: Partial<Omit<MoodEntry, 'id' | 'date'>>) => {
    setEntries(prev => 
      prev.map(entry => 
        entry.id === id ? { ...entry, ...updates } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast({
      title: "Entry deleted",
      description: "Your mood entry has been removed",
      variant: "destructive",
    });
  };

  const getEntriesByDate = (date: string) => {
    return entries.find(entry => entry.date === date);
  };

  const getLastWeekEntries = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= oneWeekAgo && entryDate <= today;
    });
  };

  return (
    <MoodContext.Provider value={{ 
      entries, 
      addEntry, 
      updateEntry, 
      deleteEntry, 
      getEntriesByDate,
      getLastWeekEntries
    }}>
      {children}
    </MoodContext.Provider>
  );
};
