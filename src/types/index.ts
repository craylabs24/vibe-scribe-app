
export type MoodLevel = 'great' | 'good' | 'neutral' | 'bad' | 'terrible';

export interface MoodEntry {
  id: string;
  date: string; // ISO date string
  mood: MoodLevel;
  note?: string;
  activities?: string[];
}
