// app/(dashboard)/page.tsx
"use client";
import { Calendar, Users, Plus, Video, UserPlus } from "lucide-react";

const todaysEvents = [
  { time: "11:20", title: "Discussing about design" },
  { time: "11:20", title: "Discussing about design" },
  { time: "11:20", title: "Discussing about design" },
  { time: "11:20", title: "Discussing about design" },
];

const projects = [
  {
    name: "Project Name",
    progress: 70,
    members: 6,
    date: "20-11-2025",
  },
  {
    name: "Project Name",
    progress: 70,
    members: 6,
    date: "20-11-2025",
  },
  {
    name: "Project Name",
    progress: 70,
    members: 6,
    date: "20-11-2025",
  },
];

const recentUpdates = [
  {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "14 minutes before",
  },
  {
    message:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "14 minutes before",
  },
  {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "14 minutes before",
  },
];

export default function PMHomePage() {
  return (
    <div className="min-h-fit">
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-screen-2xl mx-auto">
          {/* Left Column - Today's Events & Recent Updates */}
          <div className="xl:col-span-2 space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 justify-between">
                <h3 className="text-2xl font-normal text-[#000000]">
                  Today &apos;s Event
                </h3>
                <div className="bg-[#F9A62980] p-2.5 rounded-4xl">
                  <Plus size={20} className="text-[#FFFFFF]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todaysEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 border border-orange-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Video size={24} className="text-accent" />
                      <span className="text-[16px] font-medium text-black">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-black opacity-50 text-[16px] font-medium">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Updates - Same height as Projects List */}
            <div className="bg-white rounded-lg p-6 shadow-sm h-[400px] flex flex-col">
              <h3 className="text-2xl font-normal text-[#000000] mb-6">
                Recent Updates
              </h3>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-[#F9A6291A] rounded-4xl flex-shrink-0 flex items-center justify-center">
                      <UserPlus size={24} className="text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-black text-[16px] leading-relaxed">
                        {update.message}
                      </p>
                      <span className="text-black opacity-50 text-sm mt-1 block">
                        {update.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Projects List & Progress Graph */}
          <div className="xl:col-span-3 space-y-6">
            {/* Projects List - Horizontal Layout - Same height as Recent Updates */}
            <div className="bg-white rounded-lg p-6  h-[315px] flex flex-col">
              <h3 className="text-2xl font-normal text-black mb-6">
                Projects List
              </h3>

              <div className="flex gap-4 overflow-x-auto pb-2 flex-1 scrollbar-hide">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-[#F9A6291A] rounded-lg p-4 min-w-[260px] flex-shrink-0 h-fit"
                  >
                    <h4 className="font-semibold text-black text-[16px]  mb-8">
                      {project.name}
                    </h4>

                    {/* Progress Section */}
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-[#F9A6291A] mb-2">
                        <span className="font-normal text-sm text-black">
                          Progress
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#FB5711] h-2.5 rounded-full transition-all duration-300 mb-2"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                        <div className="font-medium text-right text-sm text-black">
                          {project.progress}%
                        </div>
                      </div>
                    </div>

                    {/* Members and Date */}
                    <div className="flex items-center justify-between text-sm ">
                      <div className="flex items-center gap-2 text-black">
                        <div className="w-8 h-[20px] flex">
                          <div className="w-[20px] h-[20px] bg-[#D9D9D9] rounded-4xl">
                            <div className="w-[20px] h-[20px] ml-2 bg-[#E3E3E3] rounded-4xl"></div>
                          </div>
                        </div>
                        <span className="text-normal text-black text-sm">
                          {project.members} members
                        </span>
                      </div>
                      <div>
                        <div className="opacity-50 text-black text-[10px]">
                          Deadline
                        </div>
                        <span className="text-black font-medium">
                          {project.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Graph */}
            <div className="bg-white rounded-lg p-6 ">
              <h3 className="text-2xl font-normal text-black mb-6">
                Progress Graph
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
