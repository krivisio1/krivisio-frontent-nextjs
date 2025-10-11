"use client";
import React from "react";
import CalendarDayCell, { CalendarEvent } from "./CalendarDayCell";

interface CalendarGridProps {
  daysOfWeek: string[];
  calendarDays: (number | null)[];
  eventsByDay: Record<number, CalendarEvent[]>;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ daysOfWeek, calendarDays, eventsByDay }) => {
  return (
    <div className="border border-gray-300 grid grid-cols-7">
      {/* Days Header */}
      {daysOfWeek.map((day, index) => (
        <div
          key={day}
          className={`p-3 text-sm font-medium text-gray-500 text-center border-b border-gray-300 ${
            index < 6 ? "border-r border-gray-300" : ""
          }`}
        >
          {day}
        </div>
      ))}

      {/* Day Cells */}
      {calendarDays.map((day, index) => (
        <CalendarDayCell key={index} day={day} events={day ? eventsByDay[day] : []} />
      ))}
    </div>
  );
};

export default CalendarGrid;
