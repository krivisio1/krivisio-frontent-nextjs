"use client";
import React from "react";

export interface CalendarEvent {
  time: string;
  title: string;
  type: string;
}

interface CalendarDayCellProps {
  day: number | null;
  events?: CalendarEvent[];
}

const CalendarDayCell: React.FC<CalendarDayCellProps> = ({ day, events = [] }) => {
  return (
    <div className="min-h-[120px] p-3 relative border-r border-b border-gray-300 last:border-r-0">
      {day && (
        <>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
            <div className="text-xs text-gray-400">Add</div>
          </div>

          {events.map((event, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                <div className="text-xs font-medium text-gray-900 mb-1">{event.time}</div>
                <div className="text-xs text-gray-700 mb-2">{event.title}</div>
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">{event.type}</span>
              </div>
              <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                View More
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CalendarDayCell;
