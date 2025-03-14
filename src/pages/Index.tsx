import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusIcon, CalendarIcon, BarChart2, History } from 'lucide-react';
import MoodSelector from '@/components/MoodSelector';
import JournalEntry from '@/components/JournalEntry';
import CalendarView from '@/components/CalendarView';
import MoodStats from '@/components/MoodStats';
import { MoodLevel } from '@/types';
import { useMoodContext } from '@/context/MoodContext';
import MoodHistoryItem from '@/components/MoodHistoryItem';

const Index = () => {
  const { entries, addEntry, deleteEntry, getEntriesByDate, getLastWeekEntries } = useMoodContext();
  const [selectedMood, setSelectedMood] = useState<MoodLevel | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleAddEntry = (note: string) => {
    if (selectedMood) {
      addEntry(selectedMood, note);
    }
  };

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const currentDateEntry = selectedDate 
    ? getEntriesByDate(selectedDate.toISOString().split('T')[0]) 
    : undefined;

  const todayEntry = getEntriesByDate(new Date().toISOString().split('T')[0]);
  
  // If there's already an entry for today, pre-select that mood
  React.useEffect(() => {
    if (todayEntry) {
      setSelectedMood(todayEntry.mood);
    }
  }, [todayEntry]);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="log" className="data-[state=active]:bg-primary/10">
            <PlusIcon className="h-4 w-4 mr-1" /> Log
          </TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-primary/10">
            <CalendarIcon className="h-4 w-4 mr-1" /> Calendar
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-primary/10">
            <BarChart2 className="h-4 w-4 mr-1" /> Stats
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="log" className="space-y-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <MoodSelector 
              onSelect={setSelectedMood} 
              selectedMood={selectedMood}
            />
            <JournalEntry 
              note={todayEntry?.note} 
              onSave={handleAddEntry}
            />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Recent History</h3>
              <History className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              {entries.length > 0 ? (
                entries.slice(0, 3).map(entry => (
                  <MoodHistoryItem 
                    key={entry.id} 
                    entry={entry} 
                    onDelete={deleteEntry}
                  />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No mood entries yet. Start by logging your mood above!
                </p>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <CalendarView 
              entries={entries} 
              onSelectDate={handleSelectDate}
            />
            
            {currentDateEntry && (
              <div className="mt-4 p-4 border rounded-lg">
                <h4 className="font-medium">
                  Mood for {selectedDate?.toLocaleDateString()}
                </h4>
                <p className="capitalize my-1">
                  {currentDateEntry.mood}
                </p>
                {currentDateEntry.note && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {currentDateEntry.note}
                  </p>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
            <MoodStats entries={entries} />
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Weekly Overview</h3>
              <div className="space-y-2">
                {getLastWeekEntries().length > 0 ? (
                  getLastWeekEntries().map(entry => (
                    <MoodHistoryItem 
                      key={entry.id} 
                      entry={entry} 
                      onDelete={deleteEntry}
                    />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">
                    No mood entries for the past week.
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
