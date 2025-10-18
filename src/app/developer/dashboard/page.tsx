"use client";
import React from "react";
import { Edit, CheckSquare, Bell, Video } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import sampleProfile from "@/assets/sample.png";
import { UseUserContext } from "@/app/providers/userProvider/user.context";

interface TaskItem {
  name: string;
  date: string;
  status: string;
}

interface ProjectItem {
  name: string;
  date: string;
  progress: number;
  percentage: string;
}

interface EventItem {
  time: string;
  description: string;
}

const DeveloperDashboard: React.FC = () => {
  const router = useRouter();
  const { userData } = UseUserContext();

  const tasks: TaskItem[] = [
    {
      name: "Design Product Card Component",
      date: "08-08-2025",
      status: "In Progress",
    },
    { name: "Implement Shopping Cart UI", date: "10-08-2025", status: "To Do" },
    { name: "Create User Login Form", date: "12-08-2025", status: "Review" },
    {
      name: "Build Product Filter Sidebar",
      date: "15-08-2025",
      status: "To Do",
    },
    {
      name: "Responsive Header Navigation",
      date: "18-08-2025",
      status: "Completed",
    },
  ];

  const projects: ProjectItem[] = [
    {
      name: "E-commerce Platform",
      date: "15-12-2025",
      progress: 25,
      percentage: "25%",
    },
  ];

  const events: EventItem[] = [
    { time: "10:00", description: "Project Kickoff Meeting" },
    { time: "14:30", description: "UI/UX Design Review Session" },
  ];

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

  const handleProjectClick = () => {
    router.push("/developer/dashboard/project");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left Column - Task List and Projects List */}
          <div className="lg:col-span-7">
            {/* Header */}
            <div className="mb-16 mt-6">
              <p className="text-black text-2xl mb-1">Welcome</p>
              <h1 className="text-4xl font-bold text-[#FB5711]">
                {userData.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-8 gap-6 mb-6">
              {/* Task List */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-5">
                <h2 className="text-xl font-base mb-6 text-black">Task List</h2>
                <div className="space-y-0">
                  {tasks.map((task, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="text-gray-800 font-base">
                        {task.name}
                      </span>
                      <span className="text-gray-600 text-sm text-center">
                        {task.date}
                      </span>
                      <span className="text-gray-600 text-end">
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects List */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 lg:col-span-3">
                <h2 className="text-xl font-base mb-6 text-black">
                  Projects List
                </h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      className="bg-orange-50 p-4 rounded-lg"
                      onClick={handleProjectClick}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 font-base">
                          {project.name}
                        </span>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">Deadline</div>
                          <div className="text-sm text-gray-700">
                            {project.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm text-gray-700">
                          {project.percentage}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-[#FB5711] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Graph */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-base mb-6 text-black">
                Progress Graph
              </h2>
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

          {/* Right Column */}
          <div className="lg:col-span-3">
            <div className="bg-orange-100 rounded-xl p-4 h-full">
              <div className="space-y-4 h-full flex flex-col">
                {/* Profile Card */}
                <div className="bg-white rounded-xl p-6 text-center relative">
                  <button className="absolute top-4 right-4 p-1 border border-orange-300 rounded-lg hover:bg-orange-100">
                    <Edit className="w-4 h-4 text-[#FB5711]" />
                  </button>
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                    <Image
                      src={sampleProfile}
                      alt="profile"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h3 className="text-xl font-base mb-6 text-black">
                    {userData.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {userData.bio || "No bio available."}
                  </p>
                </div>

                {/* Today's Event */}
                <div className="bg-white rounded-xl p-6 flex-1">
                  <h3 className="text-xl font-base mb-6 text-black">
                    Today's Event
                  </h3>
                  <div className="space-y-3">
                    {events.map((event, index) => (
                      <div
                        key={index}
                        className="bg-orange-100 rounded-lg p-3 flex items-start space-x-3"
                      >
                        <Video className="w-5 h-5 text-black" />
                        <div>
                          <p className="text-sm font-base text-gray-800">
                            {event.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification */}
                <div className="bg-white rounded-xl p-6 flex-1">
                  <div className="flex items-center space-x-2 mb-6">
                    <h3 className="text-xl font-base text-black">
                      Notification
                    </h3>
                  </div>
                  <div className="flex items-center justify-center h-full min-h-[120px]">
                    <span className="text-gray-400 text-sm">
                      No notifications
                    </span>
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

export default DeveloperDashboard;
