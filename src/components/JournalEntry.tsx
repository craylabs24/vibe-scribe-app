
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PencilIcon, SaveIcon } from 'lucide-react';

interface JournalEntryProps {
  note?: string;
  onSave: (note: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ note = '', onSave }) => {
  const [isEditing, setIsEditing] = useState(!note);
  const [text, setText] = useState(note);

  const handleSave = () => {
    onSave(text);
    setIsEditing(false);
  };

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Journal Note</h3>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <PencilIcon className="h-4 w-4 mr-1" /> Edit
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write about your day..."
            className="min-h-[120px]"
          />
          <Button 
            className="mt-2"
            onClick={handleSave}
          >
            <SaveIcon className="h-4 w-4 mr-1" /> Save Note
          </Button>
        </div>
      ) : (
        <div className="p-4 bg-card rounded-lg border min-h-[120px]">
          {text ? text : <span className="text-muted-foreground">No journal entry for today.</span>}
        </div>
      )}
    </div>
  );
};

export default JournalEntry;
