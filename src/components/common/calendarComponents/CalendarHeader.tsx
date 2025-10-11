"use client";
import React from "react";

interface CalendarHeaderProps {
  month: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ month, year, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrev}
        className="p-2 rounded bg-[#feedd4] hover:bg-[#fde6c4] transition-colors"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 className="text-xl font-semibold text-gray-900">
        {month} {year}
      </h2>
      <button
        onClick={onNext}
        className="p-2 bg-[#feedd4] rounded hover:bg-[#fde6c4] transition-colors"
      >
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CalendarHeader;
