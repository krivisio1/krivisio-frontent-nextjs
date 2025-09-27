"use client";
import React from "react";
import EventCard, { SidebarEvent } from "./EventCard";

interface EventsSidebarProps {
  events: SidebarEvent[];
}

const EventsSidebar: React.FC<EventsSidebarProps> = ({ events }) => {
  return (
    <div className="w-80 bg-white rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Events</h3>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventsSidebar;
