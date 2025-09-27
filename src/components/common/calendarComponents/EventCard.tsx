"use client";
import React from "react";

export interface SidebarEvent {
  type: string;
  description: string;
  date: string;
  time: string;
}

interface EventCardProps {
  event: SidebarEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="mb-4 bg-orange-50 border rounded-lg p-4">
      <div className="mb-3">
        <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">{event.type}</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{event.description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{event.date}</span>
        <span className="text-[#FB5711] font-medium">{event.time}</span>
      </div>
    </div>
  );
};

export default EventCard;
