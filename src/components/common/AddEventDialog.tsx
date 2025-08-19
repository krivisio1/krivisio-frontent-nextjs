import React, { useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Minus, Plus } from 'lucide-react';

// Type definitions
interface EventData {
  title: string;
  date: string;
  time: string;
  note: string;
}

interface AddEventDialogProps {
  children: ReactNode;
  onEventAdd?: (eventData: EventData) => void;
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({ children, onEventAdd }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [eventData, setEventData] = useState<EventData>({
    title: '',
    date: '',
    time: '10:00',
    note: ''
  });

  const handleInputChange = (field: keyof EventData, value: string): void => {
    setEventData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeChange = (increment: boolean): void => {
    const [hours, minutes] = eventData.time.split(':').map(Number);
    let newHours = hours;
    let newMinutes = minutes;

    if (increment) {
      newMinutes += 15;
      if (newMinutes >= 60) {
        newMinutes = 0;
        newHours = (newHours + 1) % 24;
      }
    } else {
      newMinutes -= 15;
      if (newMinutes < 0) {
        newMinutes = 45;
        newHours = newHours === 0 ? 23 : newHours - 1;
      }
    }

    const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    handleInputChange('time', formattedTime);
  };

  const handleCreate = (): void => {
    if (eventData.title && eventData.date) {
      if (onEventAdd) {
        onEventAdd(eventData);
      }
      // Reset form
      setEventData({
        title: '',
        date: '',
        time: '10:00',
        note: ''
      });
      setIsOpen(false);
    }
  };

  const formatDisplayTime = (time24: string): string => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Event
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-900">
              Title
            </Label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('title', e.target.value)}
              placeholder="Design Sync-up"
              className="w-full"
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium text-gray-900">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={eventData.date}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('date', e.target.value)}
                  className="w-full pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium text-gray-900">
                Time
              </Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => handleTimeChange(false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center py-2 border rounded-md bg-gray-50">
                  <span className="text-sm font-medium">
                    {formatDisplayTime(eventData.time)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0"
                  onClick={() => handleTimeChange(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium text-gray-900">
              Note
            </Label>
            <Textarea
              id="note"
              value={eventData.note}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('note', e.target.value)}
              placeholder="Type here..."
              className="w-full min-h-[80px] resize-none"
            />
          </div>

          {/* Create Button */}
          <div className="pt-4">
            <Button
              onClick={handleCreate}
              className="w-full bg-[#FB5711] hover:bg-orange-600 text-white"
              disabled={!eventData.title || !eventData.date}
            >
              Create
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;