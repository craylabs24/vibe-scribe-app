
import React from 'react';
import { format } from 'date-fns';
import { MoodEntry, MoodLevel } from '@/types';
import { SmilePlus, Smile, Meh, Frown, FrownOpen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface MoodHistoryItemProps {
  entry: MoodEntry;
  onDelete: (id: string) => void;
}

const MoodHistoryItem: React.FC<MoodHistoryItemProps> = ({ entry, onDelete }) => {
  const { id, date, mood, note } = entry;
  
  const moodIcons: Record<MoodLevel, React.ReactNode> = {
    great: <SmilePlus className="h-6 w-6 text-mood-great" />,
    good: <Smile className="h-6 w-6 text-mood-good" />,
    neutral: <Meh className="h-6 w-6 text-mood-neutral" />,
    bad: <Frown className="h-6 w-6 text-mood-bad" />,
    terrible: <FrownOpen className="h-6 w-6 text-mood-terrible" />,
  };

  const moodLabels: Record<MoodLevel, string> = {
    great: 'Great',
    good: 'Good',
    neutral: 'Okay',
    bad: 'Bad',
    terrible: 'Terrible',
  };

  const formattedDate = format(new Date(date), 'MMM d, yyyy');

  return (
    <div className="flex p-4 border rounded-lg bg-card mb-2">
      <div className="mr-3">
        {moodIcons[mood]}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{formattedDate}</p>
            <p className="text-sm text-muted-foreground">{moodLabels[mood]}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete mood entry?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete your mood entry for {formattedDate}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        {note && <p className="text-sm mt-2">{note}</p>}
      </div>
    </div>
  );
};

export default MoodHistoryItem;
