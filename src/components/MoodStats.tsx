
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodEntry, MoodLevel } from '@/types';
import { BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MoodStatsProps {
  entries: MoodEntry[];
}

const MoodStats: React.FC<MoodStatsProps> = ({ entries }) => {
  const moodCounts: Record<MoodLevel, number> = {
    great: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    terrible: 0,
  };

  // Count occurrences of each mood
  entries.forEach(entry => {
    moodCounts[entry.mood]++;
  });

  const totalEntries = entries.length;
  
  // Calculate percentages
  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood as MoodLevel,
    count,
    percentage: totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0,
  }));

  // Calculate the dominant mood
  const dominantMood = entries.length > 0 
    ? Object.entries(moodCounts)
        .sort(([, a], [, b]) => b - a)[0][0]
    : null;

  // Map mood names to display names
  const moodDisplayNames: Record<MoodLevel, string> = {
    great: 'Great',
    good: 'Good',
    neutral: 'Okay',
    bad: 'Bad',
    terrible: 'Terrible',
  };

  const moodProgressColors: Record<MoodLevel, string> = {
    great: 'bg-mood-great',
    good: 'bg-mood-good',
    neutral: 'bg-mood-neutral',
    bad: 'bg-mood-bad',
    terrible: 'bg-mood-terrible',
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Mood Stats</CardTitle>
          <BarChart2 className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {totalEntries > 0 ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">
                Based on your last {totalEntries} entries
              </p>
              <p className="font-medium">
                Your dominant mood: {' '}
                <span className="capitalize">{dominantMood && moodDisplayNames[dominantMood as MoodLevel]}</span>
              </p>
            </div>
            
            <div className="space-y-3">
              {moodPercentages.map(({ mood, percentage }) => (
                <div key={mood} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{moodDisplayNames[mood]}</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress 
                    value={percentage} 
                    max={100} 
                    className={`h-2 ${moodProgressColors[mood]}`} 
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-6">
            No mood data yet. Start tracking to see your stats!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodStats;
