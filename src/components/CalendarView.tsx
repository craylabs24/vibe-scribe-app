
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { MoodEntry, MoodLevel } from '@/types';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  entries: MoodEntry[];
  onSelectDate: (date: Date | undefined) => void;
}

const moodColors: Record<MoodLevel, string> = {
  great: 'bg-mood-great',
  good: 'bg-mood-good',
  neutral: 'bg-mood-neutral',
  bad: 'bg-mood-bad',
  terrible: 'bg-mood-terrible',
};

const CalendarView: React.FC<CalendarViewProps> = ({ entries, onSelectDate }) => {
  // Create a map of dates to mood entries for easier lookup
  const entryMap = entries.reduce((acc, entry) => {
    acc[entry.date] = entry;
    return acc;
  }, {} as Record<string, MoodEntry>);

  const getDayClass = (date: Date): string => {
    // Format date to match the format stored in entries (YYYY-MM-DD)
    const formattedDate = date.toISOString().split('T')[0];
    const entry = entryMap[formattedDate];
    
    if (!entry) return '';
    
    return cn(
      'relative',
      'after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2',
      'after:h-2 after:w-2 after:rounded-full',
      `after:${moodColors[entry.mood]}`,
    );
  };
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-2">Calendar</h3>
      <Calendar
        mode="single"
        className="rounded-md border"
        onSelect={onSelectDate}
        modifiersClassNames={{
          selected: 'bg-primary text-primary-foreground',
        }}
        modifiers={{
          mood: (date) => {
            const formattedDate = date.toISOString().split('T')[0];
            return !!entryMap[formattedDate];
          },
        }}
        modifiersStyles={{
          mood: { fontWeight: 'bold' }
        }}
        components={{
          DayContent: (props) => (
            <div className={getDayClass(props.date)}>
              {props.date.getDate()}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default CalendarView;
