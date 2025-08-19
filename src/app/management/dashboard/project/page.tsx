// app/(dashboard)/project-details/page.tsx
"use client";
import {
  Calendar,
  Users,
  Plus,
  Edit,
  MoreHorizontal,
  MoveDiagonal,
} from "lucide-react";

const teamMembers = [
  { name: "Arjun Sharma", progress: 0, deadline: "20-06-2025" },
  { name: "Priya Patel", progress: 0, deadline: "20-06-2025" },
  { name: "Rohit Kumar", progress: 0, deadline: "20-06-2025" },
  { name: "Sneha Reddy", progress: 0, deadline: "20-06-2025" },
];

const todayTasks = [
  {
    title: "Set up project repository and initial structure",
    developer: "Arjun Sharma",
    time: "10:00 am",
  },
  {
    title: "Create database design for product catalog",
    developer: "Priya Patel",
    time: "11:30 am",
  },
  {
    title: "Design wireframes for homepage and product pages",
    developer: "Rohit Kumar",
    time: "02:00 pm",
  },
  {
    title: "Research payment gateway integration options",
    developer: "Sneha Reddy",
    time: "03:30 pm",
  },
];
const yesterdayTasks = [
  {
    title: "Set up project repository and initial structure",
    developer: "Arjun Sharma",
    time: "10:00 am",
  },
  {
    title: "Create database design for product catalog",
    developer: "Priya Patel",
    time: "11:30 am",
  },
  {
    title: "Design wireframes for homepage and product pages",
    developer: "Rohit Kumar",
    time: "02:00 pm",
  },
  {
    title: "Research payment gateway integration options",
    developer: "Sneha Reddy",
    time: "03:30 pm",
  },
];

const frontendDevelopers = [
  { name: "Vikash Singh", tasks: "5 Tasks" },
  { name: "Kavya Nair", tasks: "4 Tasks" },
  { name: "Ankit Gupta", tasks: "6 Tasks" },
  { name: "Meera Joshi", tasks: "3 Tasks" },
];

export default function ProjectDetailsPage() {
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
    <div className="min-h-fit bg-white">
      {/* Header Section */}
      <header className="flex justify-between items-start w-full px-8 pt-10 pb-4">
        <div>
          <div className="text-[42px] text-[#FB5711] font-bold mt-1">
            E-commerce Platform
          </div>
        </div>
        <button className="bg-[#FB5711] hover:bg-orange-400 text-white px-6 py-2 rounded font-semibold shadow mt-1 transition">
          + Create Meet
        </button>
      </header>

      {/* Main Content - Modified to 50:50 Layout */}
      <div className="p-4">
        <div className="flex gap-4 max-w-screen-2xl mx-auto">
          {/* Left Column - 50% width (Progress Graph & Timeline) */}
          <div className="w-1/2 space-y-6">
            {/* Progress Graph Section */}
            <div className="bg-white rounded-lg p-6 ">
              <h3 className="text-2xl font-normal text-black mb-6">
                Progress Graph
              </h3>
              <div className="h-64 bg-[#F5F5F5] rounded-lg p-6">
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

            {/* Timeline Section */}
            <div className="bg-white rounded-lg p-6 ">
              <h3 className="text-xl font-semibold text-[#FB5711] text-[18px] mb-6">
                Today
              </h3>

              {/* Today Section - Two Column Layout */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {todayTasks.map((task, index) => (
                    <div
                      key={index}
                      className=" rounded-lg p-4 border border-[#1b91394f]"
                    >
                      <p className="text-black text-[16px] font-normal mb-2">
                        {task.title}
                      </p>
                      <div className="flex justify-between items-center text-xs text-black opacity-50">
                        <span>By {task.developer}</span>
                        <span>{task.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yesterday Section - Two Column Layout */}
              <div className="mb-6">
                <h4 className=" font-semibold text-[#FB5711] text-[18px] mb-4">
                  Yesterday
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {yesterdayTasks.map((task, index) => (
                    <div
                      key={index}
                      className="rounded-lg p-4 border border-[#1b91394f]"
                    >
                      <p className="text-gray-900 text-[16px] font-normal mb-2">
                        {task.title}
                      </p>
                      <div className="flex justify-between items-center text-xs text-black opacity-50">
                        <span>By {task.developer}</span>
                        <span>{task.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 50% width (Team Members & Task List) */}
          <div className="w-1/2 space-y-6">
            {/* Team Members Section */}
            {/* Team Members Section - Table Layout with Proper Column Headers */}
            <div className="bg-white rounded-lg p-6 ">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl  font-normal text-black">
                  Team Members
                </h3>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  {/* Table Header */}
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left text-[16px] py-3 px-4 font-normal text-black">
                        Name
                      </th>
                      <th className="text-left text-[16px] py-3 px-4 font-normal text-black">
                        Progress
                      </th>
                      <th className="text-left text-[16px] py-3 px-4 font-normal text-black">
                        Deadline
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {teamMembers.map((member, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        {/* Name Column */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="font-normal text-black text-[16px]">
                              {member.name}
                            </span>
                          </div>
                        </td>

                        {/* Progress Column */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-5 min-w-[80px] max-w-[120px]">
                              <div
                                className="bg-[#FB5711] h-5  rounded-4xl transition-all duration-300"
                                style={{ width: `${member.progress}%` }}
                              >
                                <span className=" flex items-center align-middle  justify-center text-xs font-medium text-white">
                                  {member.progress}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Deadline Column */}
                        <td className="py-4 px-4">
                          <span className="text-[16px] text-black font-normal">
                            {member.deadline}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Task List Section */}
            <div className="bg-white rounded-lg p-6 ">
              <h3 className="text-2xl  font-normal text-gray-900 mb-6">
                Task List
              </h3>

              {/* Frontend Developer Tasks Section - 2 Column Grid */}
              <div className="grid grid-cols-2 gap-4">
                {frontendDevelopers.map((dev, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="text-[16px] font-normal text-black">
                          {dev.name}
                        </span>
                        <div className="text-xs text-black opacity-50">
                          {dev.tasks}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#F9A6291A] rounded-lg">
                      <MoveDiagonal
                        size={16}
                        className="text-[#FB5711] cursor-pointer hover:text-gray-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
