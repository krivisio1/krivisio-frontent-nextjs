"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CalendarPage = () => {
  const router = useRouter();

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Current month and year state
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  // Generate calendar grid for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // What day of the week does the month start on (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay();
    // How many days in this month
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    let dayNumber = 1;
    
    // We need 6 rows to accommodate all possible month layouts
    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startingDayOfWeek) {
          // Empty cells before month starts
          days.push(null);
        } else if (dayNumber <= daysInMonth) {
          // Actual days of the month
          days.push(dayNumber);
          dayNumber++;
        } else {
          // Empty cells after month ends
          days.push(null);
        }
      }
      // If we've added all days and the rest would be empty, break
      if (dayNumber > daysInMonth && days.length % 7 === 0) {
        break;
      }
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const totalRows = Math.ceil(calendarDays.length / 7);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Matching Board page exactly */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6 border-b border-gray-200">
              <button className="pb-3 text-gray-500" onClick={() => router.push('/management/dashboard/board')}>
                Board
              </button>
              <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">
                Calendar
              </button>
            </div>
            <button className="px-4 py-2 bg-[#FB5711] text-white rounded-md text-sm font-medium hover:bg-orange-600">
              Add
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Calendar Section */}
          <div className="flex-1 bg-white rounded-lg p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={goToPreviousMonth}
                className="p-2 rounded bg-[#feedd4] hover:bg-[#fde6c4] transition-colors"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button 
                onClick={goToNextMonth}
                className="p-2 bg-[#feedd4] rounded hover:bg-[#fde6c4] transition-colors"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Calendar Grid with borders */}
            <div className="border border-gray-300 grid grid-cols-7">
              {/* Days of Week Header */}
              {daysOfWeek.map((day, index) => (
                <div 
                  key={day} 
                  className={`p-3 text-sm font-medium text-gray-500 text-center border-b border-gray-300 ${
                    index < 6 ? 'border-r border-gray-300' : ''
                  }`}
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.flat().map((day, index) => {
                const dayIndex = index % 7;
                const weekIndex = Math.floor(index / 7);
                const isLastRow = weekIndex === totalRows - 1;
                
                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-3 relative ${
                      dayIndex < 6 ? 'border-r border-gray-300' : ''
                    } ${
                      !isLastRow ? 'border-b border-gray-300' : ''
                    }`}
                  >
                    {day && (
                      <>
                        <div className='flex items-center justify-between'>
                          <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                          <div className="text-xs text-gray-400">Add</div>
                        </div>
                        
                        {/* Project Kickoff Meeting on day 5 */}
                        {day === 5 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">10:00 AM</div>
                              <div className="text-xs text-gray-700 mb-2">E-commerce Project Kickoff</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Meeting</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}

                        {/* Database Design Review on day 8 */}
                        {day === 8 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">02:30 PM</div>
                              <div className="text-xs text-gray-700 mb-2">Database Schema Review</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Review</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}

                        {/* UI/UX Wireframe Presentation on day 12 */}
                        {day === 12 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">11:30 AM</div>
                              <div className="text-xs text-gray-700 mb-2">Wireframe Presentation</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Design</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}

                        {/* API Development Deadline on day 18 */}
                        {day === 18 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">06:00 PM</div>
                              <div className="text-xs text-gray-700 mb-2">Product API Development</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Deadline</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}

                        {/* Sprint Planning on day 22 */}
                        {day === 22 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">09:30 AM</div>
                              <div className="text-xs text-gray-700 mb-2">Sprint 2 Planning</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Planning</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}

                        {/* Security Testing on day 25 */}
                        {day === 25 && (
                          <div className='flex flex-col'>
                            <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
                              <div className="text-xs font-medium text-gray-900 mb-1">01:00 PM</div>
                              <div className="text-xs text-gray-700 mb-2">Security Audit & Testing</div>
                              <div className="">
                                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Testing</span>
                              </div>
                            </div>
                            <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
                              View More
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="w-80 bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            
            {/* Project Kickoff */}
            <div className="mb-4 bg-orange-50 border rounded-lg p-4">
              <div className="mb-3">
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Meeting</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                E-commerce platform project kickoff meeting. Define project scope, timeline, and team responsibilities.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">05-08-2025</span>
                <span className="text-[#FB5711] font-medium">10:00 AM</span>
              </div>
            </div>

            {/* Database Design Review */}
            <div className="mb-4 bg-orange-50 border rounded-lg p-4">
              <div className="mb-3">
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Review</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Review database schema for products, users, orders, and inventory management. Ensure scalability and performance.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">08-08-2025</span>
                <span className="text-[#FB5711] font-medium">02:30 PM</span>
              </div>
            </div>

            {/* UI/UX Wireframe Presentation */}
            <div className="mb-4 bg-orange-50 border rounded-lg p-4">
              <div className="mb-3">
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Design</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Present wireframes for product catalog, shopping cart, checkout flow, and user dashboard interfaces.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">12-08-2025</span>
                <span className="text-[#FB5711] font-medium">11:30 AM</span>
              </div>
            </div>

            {/* API Development Deadline */}
            <div className="mb-4 bg-orange-50 border rounded-lg p-4">
              <div className="mb-3">
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Deadline</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Complete development of core product APIs: product listing, search, filtering, and basic CRUD operations.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">18-08-2025</span>
                <span className="text-[#FB5711] font-medium">06:00 PM</span>
              </div>
            </div>

            {/* Sprint Planning */}
            <div className="bg-orange-50 border rounded-lg p-4">
              <div className="mb-3">
                <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Planning</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Plan Sprint 2 focusing on user authentication, shopping cart functionality, and payment gateway integration.
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">22-08-2025</span>
                <span className="text-[#FB5711] font-medium">09:30 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
