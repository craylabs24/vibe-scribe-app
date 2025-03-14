
import React from 'react';
import { 
  SmilePlus, 
  Smile, 
  Meh, 
  Frown, 
  AngryIcon 
} from 'lucide-react';
import { MoodLevel } from '@/types';
import { cn } from '@/lib/utils';

interface MoodSelectorProps {
  onSelect: (mood: MoodLevel) => void;
  selectedMood?: MoodLevel;
}

const moods: Array<{ value: MoodLevel; icon: React.ReactNode; label: string; color: string }> = [
  { 
    value: 'great', 
    icon: <SmilePlus className="mood-icon" />, 
    label: 'Great', 
    color: 'bg-mood-great/10 hover:bg-mood-great/20 border-mood-great/30' 
  },
  { 
    value: 'good', 
    icon: <Smile className="mood-icon" />, 
    label: 'Good', 
    color: 'bg-mood-good/10 hover:bg-mood-good/20 border-mood-good/30' 
  },
  { 
    value: 'neutral', 
    icon: <Meh className="mood-icon" />, 
    label: 'Okay', 
    color: 'bg-mood-neutral/10 hover:bg-mood-neutral/20 border-mood-neutral/30' 
  },
  { 
    value: 'bad', 
    icon: <Frown className="mood-icon" />, 
    label: 'Bad', 
    color: 'bg-mood-bad/10 hover:bg-mood-bad/20 border-mood-bad/30' 
  },
  { 
    value: 'terrible', 
    icon: <AngryIcon className="mood-icon" />, 
    label: 'Terrible', 
    color: 'bg-mood-terrible/10 hover:bg-mood-terrible/20 border-mood-terrible/30' 
  },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, selectedMood }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3 text-center">How are you feeling today?</h3>
      <div className="grid grid-cols-5 gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            onClick={() => onSelect(mood.value)}
            className={cn(
              'mood-card border-2',
              mood.color,
              selectedMood === mood.value && 'ring-2 ring-primary animate-pulse-scale'
            )}
          >
            {mood.icon}
            <span className="text-sm font-medium">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
