// app/(dashboard)/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Users, Plus } from "lucide-react";

const todaysEvents = [
  { time: "09:30", title: "Sprint Planning Meeting" },
  { time: "11:00", title: "Client Demo - Payment System" },
  { time: "14:30", title: "Code Review Session" },
  { time: "16:00", title: "Infrastructure Security Audit" },
];

// Single initialized project
const projects = [
  {
    id: "project-1",
    name: "E-commerce Platform Development",
    description: "Building a modern e-commerce platform with React and Node.js",
    progress: 0, // Just initialized
    members: 0, // No members assigned yet
    date: "28-02-2026",
    status: "initialized",
    createdAt: new Date().toISOString(),
  },
];

const recentUpdates = [
  {
    message:
      "New project 'E-commerce Platform Development' has been initialized and is ready for team assignment.",
    time: "5 minutes ago",
  },
  {
    message:
      "Project workspace created successfully. You can now start adding team members and defining tasks.",
    time: "10 minutes ago",
  },
];

const ExactMainContent = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      // Navigate to project create page with description as query parameter
      router.push(
        `/management/dashboard/project-create?description=${encodeURIComponent(description.trim())}`,
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <main className="flex flex-col items-center">
      {/* Empty State Illustration */}
      <div>
        <Image
          src="/empty-box.png"
          alt="Empty project box"
          width={194}
          height={180}
        />
      </div>
      <div className="text-[#FB5711] text-6xl font-semibold opacity-20 mb-16">
        No project
      </div>

      <p className="text-[#161C28] text-base mb-4">Create your first project</p>
      {/* Input and Submit */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-96 bg-[#FBFBFB] rounded-lg shadow px-4 py-2"
      >
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none px-2 text-base text-[#161C28]"
          placeholder="Describe your project"
        />
        <button
          type="submit"
          className="ml-3 bg-[#FB5711] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-orange-400 transition-colors duration-200 shadow-sm"
        >
          <Image
            src="/uparrow.png"
            alt="Send"
            width={16}
            height={16}
            className="object-contain"
          />
        </button>
      </form>
    </main>
  );
};

const DashboardContent = () => {
  const router = useRouter();

  // Sample data for the linear graph
  const progressData = [
    { week: "Week 1", progress: 5 },
    { week: "Week 2", progress: 12 },
    { week: "Week 3", progress: 18 },
    { week: "Week 4", progress: 25 },
    { week: "Week 5", progress: 35 },
    { week: "Week 6", progress: 45 },
  ];

  const maxProgress = Math.max(...progressData.map((d) => d.progress));

  return (
    <div className="min-h-fit">
      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-screen-2xl mx-auto">
          {/* Left Column - Today's Events & Recent Updates */}
          <div className="xl:col-span-2 space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2.5 rounded-lg">
                  <Calendar className="text-accent w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Today Event
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todaysEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-orange-50 rounded-lg p-4 border border-orange-100"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-accent" />
                      <span className="text-sm font-medium text-gray-700">
                        {event.time}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm font-medium">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Updates - Same height as Projects List */}
            <div className="bg-white rounded-lg p-6 shadow-sm h-[400px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Updates
              </h3>

              <div className="space-y-4 flex-1 overflow-y-auto">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 flex items-center justify-center">
                      <Users size={14} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {update.message}
                      </p>
                      <span className="text-gray-500 text-xs mt-1 block">
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
            <div className="bg-white rounded-lg p-6 shadow-sm h-[400px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Projects List
              </h3>

              <div className="flex gap-4 overflow-x-auto pb-2 flex-1 scrollbar-hide">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 min-w-[260px] flex-shrink-0 h-fit"
                    onClick={() => {
                      router.push(`/management/dashboard/project/`);
                    }}
                  >
                    <h4 className="font-semibold text-gray-900 text-base mb-3">
                      {project.name}
                    </h4>

                    {/* Progress Section */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-semibold">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#FB5711] h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Members and Date */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users size={14} />
                        <span>{project.members} members</span>
                      </div>
                      <span className="text-gray-500 font-medium">
                        {project.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Graph */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Progress Graph
              </h3>
              <div className="h-64 bg-gray-50 rounded-lg p-6">
                <div className="h-full relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
                    <span>{maxProgress}%</span>
                    <span>{Math.round(maxProgress * 0.75)}%</span>
                    <span>{Math.round(maxProgress * 0.5)}%</span>
                    <span>{Math.round(maxProgress * 0.25)}%</span>
                    <span>0%</span>
                  </div>

                  {/* Graph area */}
                  <div className="ml-8 h-full relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0">
                      {[0, 25, 50, 75, 100].map((line) => (
                        <div
                          key={line}
                          className="absolute w-full border-t border-gray-200"
                          style={{ bottom: `${line}%` }}
                        />
                      ))}
                    </div>

                    {/* Line graph */}
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 500 200"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        fill="none"
                        stroke="#FB5711"
                        strokeWidth="3"
                        points={progressData
                          .map(
                            (point, index) =>
                              `${(index * 500) / (progressData.length - 1)},${200 - (point.progress / maxProgress) * 200}`,
                          )
                          .join(" ")}
                      />
                      {/* Data points */}
                      {progressData.map((point, index) => (
                        <circle
                          key={index}
                          cx={(index * 500) / (progressData.length - 1)}
                          cy={200 - (point.progress / maxProgress) * 200}
                          r="4"
                          fill="#FB5711"
                        />
                      ))}
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500">
                      {progressData.map((point, index) => (
                        <span key={index}>{point.week}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PMHomePage() {
  // Check if projects exist to determine which view to show
  const hasProjects = projects.length > 0;

  return <div>{hasProjects ? <DashboardContent /> : <ExactMainContent />}</div>;
}
