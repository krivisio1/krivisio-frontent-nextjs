// "use client"
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';

// const CalendarPage = () => {
//   const router = useRouter();

//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
//                      'July', 'August', 'September', 'October', 'November', 'December'];
  
//   // Current month and year state
//   const [currentDate, setCurrentDate] = useState(new Date());
  
//   // Navigate to previous month
//   const goToPreviousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };
  
//   // Navigate to next month
//   const goToNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };
  
//   // Generate calendar grid for current month
//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
    
//     // First day of the month
//     const firstDay = new Date(year, month, 1);
//     // Last day of the month
//     const lastDay = new Date(year, month + 1, 0);
//     // What day of the week does the month start on (0 = Sunday)
//     const startingDayOfWeek = firstDay.getDay();
//     // How many days in this month
//     const daysInMonth = lastDay.getDate();
    
//     const days = [];
//     let dayNumber = 1;
    
//     // We need 6 rows to accommodate all possible month layouts
//     for (let week = 0; week < 6; week++) {
//       for (let day = 0; day < 7; day++) {
//         if (week === 0 && day < startingDayOfWeek) {
//           // Empty cells before month starts
//           days.push(null);
//         } else if (dayNumber <= daysInMonth) {
//           // Actual days of the month
//           days.push(dayNumber);
//           dayNumber++;
//         } else {
//           // Empty cells after month ends
//           days.push(null);
//         }
//       }
//       // If we've added all days and the rest would be empty, break
//       if (dayNumber > daysInMonth && days.length % 7 === 0) {
//         break;
//       }
//     }
    
//     return days;
//   };

//   const calendarDays = generateCalendarDays();
//   const totalRows = Math.ceil(calendarDays.length / 7);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header - Matching Board page exactly */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex space-x-6 border-b border-gray-200">
//               <button className="pb-3 text-gray-500" onClick={() => router.push('/developer/dashboard/board')}>
//                 Board
//               </button>
//               <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">
//                 Calendar
//               </button>
//             </div>
//             <button className="px-4 py-2 bg-[#FB5711] text-white rounded-md text-sm font-medium hover:bg-orange-600">
//               Add
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-6">
//           {/* Calendar Section */}
//           <div className="flex-1 bg-white rounded-lg p-6">
//             {/* Calendar Header */}
//             <div className="flex items-center justify-between mb-6">
//               <button 
//                 onClick={goToPreviousMonth}
//                 className="p-2 rounded bg-[#feedd4] hover:bg-[#fde6c4] transition-colors"
//               >
//                 <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
//               </h2>
//               <button 
//                 onClick={goToNextMonth}
//                 className="p-2 bg-[#feedd4] rounded hover:bg-[#fde6c4] transition-colors"
//               >
//                 <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>

//             {/* Calendar Grid with borders */}
//             <div className="border border-gray-300 grid grid-cols-7">
//               {/* Days of Week Header */}
//               {daysOfWeek.map((day, index) => (
//                 <div 
//                   key={day} 
//                   className={`p-3 text-sm font-medium text-gray-500 text-center border-b border-gray-300 ${
//                     index < 6 ? 'border-r border-gray-300' : ''
//                   }`}
//                 >
//                   {day}
//                 </div>
//               ))}

//               {/* Calendar Days */}
//               {calendarDays.flat().map((day, index) => {
//                 const dayIndex = index % 7;
//                 const weekIndex = Math.floor(index / 7);
//                 const isLastRow = weekIndex === totalRows - 1;
                
//                 return (
//                   <div
//                     key={index}
//                     className={`min-h-[120px] p-3 relative ${
//                       dayIndex < 6 ? 'border-r border-gray-300' : ''
//                     } ${
//                       !isLastRow ? 'border-b border-gray-300' : ''
//                     }`}
//                   >
//                     {day && (
//                       <>
//                         <div className='flex items-center justify-between'>
//                           <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
//                           <div className="text-xs text-gray-400">Add</div>
//                         </div>
                        
//                         {/* UI Component Design Review on day 6 */}
//                         {day === 6 && (
//                           <div className='flex flex-col'>
//                             <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
//                               <div className="text-xs font-medium text-gray-900 mb-1">10:30 AM</div>
//                               <div className="text-xs text-gray-700 mb-2">UI Component Design Review</div>
//                               <div className="">
//                                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Review</span>
//                               </div>
//                             </div>
//                             <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
//                               View More
//                             </button>
//                           </div>
//                         )}

//                         {/* Complete Login Form Implementation deadline on day 10 */}
//                         {day === 10 && (
//                           <div className='flex flex-col'>
//                             <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
//                               <div className="text-xs font-medium text-gray-900 mb-1">06:00 PM</div>
//                               <div className="text-xs text-gray-700 mb-2">Complete Login Form Implementation</div>
//                               <div className="">
//                                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Deadline</span>
//                               </div>
//                             </div>
//                             <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
//                               View More
//                             </button>
//                           </div>
//                         )}

//                         {/* Frontend Team Weekly Sync on day 15 */}
//                         {day === 15 && (
//                           <div className='flex flex-col'>
//                             <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
//                               <div className="text-xs font-medium text-gray-900 mb-1">02:00 PM</div>
//                               <div className="text-xs text-gray-700 mb-2">Frontend Team Weekly Sync</div>
//                               <div className="">
//                                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Meeting</span>
//                               </div>
//                             </div>
//                             <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
//                               View More
//                             </button>
//                           </div>
//                         )}

//                         {/* Product Card Component Review on day 20 */}
//                         {day === 20 && (
//                           <div className='flex flex-col'>
//                             <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
//                               <div className="text-xs font-medium text-gray-900 mb-1">11:00 AM</div>
//                               <div className="text-xs text-gray-700 mb-2">Product Card Component Review</div>
//                               <div className="">
//                                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Review</span>
//                               </div>
//                             </div>
//                             <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
//                               View More
//                             </button>
//                           </div>
//                         )}

//                         {/* User Interface Testing Session on day 25 */}
//                         {day === 25 && (
//                           <div className='flex flex-col'>
//                             <div className="mt-2 bg-orange-50 p-2 rounded mb-2">
//                               <div className="text-xs font-medium text-gray-900 mb-1">03:30 PM</div>
//                               <div className="text-xs text-gray-700 mb-2">User Interface Testing Session</div>
//                               <div className="">
//                                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded-lg">Testing</span>
//                               </div>
//                             </div>
//                             <button className="px-2 py-1 border border-gray-300 text-gray-500 text-xs rounded-lg hover:bg-gray-50 w-fit">
//                               View More
//                             </button>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Events Sidebar */}
//           <div className="w-80 bg-white rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Events</h3>
            
//             {/* UI Component Design Review */}
//             <div className="mb-4 bg-orange-50 border rounded-lg p-4">
//               <div className="mb-3">
//                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Review</span>
//               </div>
//               <p className="text-sm text-gray-700 mb-3">
//                 UI Component Design Review - Review wireframes and mockups for product catalog page components
//               </p>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-500">06-08-2025</span>
//                 <span className="text-[#FB5711] font-medium">10:30 AM</span>
//               </div>
//             </div>

//             {/* Login Form Implementation Deadline */}
//             <div className="mb-4 bg-orange-50 border rounded-lg p-4">
//               <div className="mb-3">
//                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Deadline</span>
//               </div>
//               <p className="text-sm text-gray-700 mb-3">
//                 Complete Login Form Implementation - Finish user authentication form with validation and error handling
//               </p>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-500">10-08-2025</span>
//                 <span className="text-[#FB5711] font-medium">06:00 PM</span>
//               </div>
//             </div>

//             {/* Frontend Team Weekly Sync */}
//             <div className="mb-4 bg-orange-50 border rounded-lg p-4">
//               <div className="mb-3">
//                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Meeting</span>
//               </div>
//               <p className="text-sm text-gray-700 mb-3">
//                 Frontend Team Weekly Sync - Discuss progress on product components and upcoming UI tasks
//               </p>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-500">15-08-2025</span>
//                 <span className="text-[#FB5711] font-medium">02:00 PM</span>
//               </div>
//             </div>

//             {/* Product Card Component Review */}
//             <div className="bg-orange-50 border rounded-lg p-4">
//               <div className="mb-3">
//                 <span className="px-2 py-1 bg-[#F9A62933] text-black text-xs rounded">Review</span>
//               </div>
//               <p className="text-sm text-gray-700 mb-3">
//                 Product Card Component Review - Peer review of product card implementation with hover effects
//               </p>
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-500">20-08-2025</span>
//                 <span className="text-[#FB5711] font-medium">11:00 AM</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CalendarHeader from "@/components/common/calendarComponents/CalendarHeader";
import CalendarGrid from "@/components/common/calendarComponents/CalendarGrid";
import EventsSidebar from "@/components/common/calendarComponents/EventsSidebar";
import { CalendarEvent } from "@/components/common/calendarComponents/CalendarDayCell";
import { SidebarEvent } from "@/components/common/calendarComponents/EventCard";

const CalendarPage: React.FC = () => {
  const router = useRouter();

  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const generateCalendarDays = (): (number | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    let dayNumber = 1;

    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        if (week === 0 && day < startingDayOfWeek) {
          days.push(null);
        } else if (dayNumber <= daysInMonth) {
          days.push(dayNumber);
          dayNumber++;
        } else {
          days.push(null);
        }
      }
      if (dayNumber > daysInMonth && days.length % 7 === 0) break;
    }
    return days;
  };

  // Events inside calendar grid
  const eventsByDay: Record<number, CalendarEvent[]> = {
    6: [{ time: "10:30 AM", title: "UI Component Design Review", type: "Review" }],
    10: [{ time: "06:00 PM", title: "Complete Login Form Implementation", type: "Deadline" }],
    15: [{ time: "02:00 PM", title: "Frontend Team Weekly Sync", type: "Meeting" }],
    20: [{ time: "11:00 AM", title: "Product Card Component Review", type: "Review" }],
    25: [{ time: "03:30 PM", title: "User Interface Testing Session", type: "Testing" }],
  };

  // Sidebar events
  const sidebarEvents: SidebarEvent[] = [
    { type: "Review", description: "UI Component Design Review - Review wireframes and mockups for product catalog page components", date: "06-08-2025", time: "10:30 AM" },
    { type: "Deadline", description: "Complete Login Form Implementation - Finish user authentication form with validation and error handling", date: "10-08-2025", time: "06:00 PM" },
    { type: "Meeting", description: "Frontend Team Weekly Sync - Discuss progress on product components and upcoming UI tasks", date: "15-08-2025", time: "02:00 PM" },
    { type: "Review", description: "Product Card Component Review - Peer review of product card implementation with hover effects", date: "20-08-2025", time: "11:00 AM" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6 border-b border-gray-200">
              <button className="pb-3 text-gray-500" onClick={() => router.push('/developer/dashboard/board')}>Board</button>
              <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">Calendar</button>
            </div>
            <button className="px-4 py-2 bg-[#FB5711] text-white rounded-md text-sm font-medium hover:bg-orange-600">Add</button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Calendar Section */}
          <div className="flex-1 bg-white rounded-lg p-6">
            <CalendarHeader
              month={monthNames[currentDate.getMonth()]}
              year={currentDate.getFullYear()}
              onPrev={goToPreviousMonth}
              onNext={goToNextMonth}
            />
            <CalendarGrid
              daysOfWeek={daysOfWeek}
              calendarDays={generateCalendarDays()}
              eventsByDay={eventsByDay}
            />
          </div>

          {/* Sidebar */}
          <EventsSidebar events={sidebarEvents} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
