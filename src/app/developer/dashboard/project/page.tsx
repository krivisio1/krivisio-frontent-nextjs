import React from "react";
import { Edit, MoveDiagonal } from "lucide-react";

interface BacklogItem {
  taskName: string;
  date: string;
  status: string;
}

interface TodayProgressItem {
  description: string;
  author: string;
  role: string;
  time: string;
}

interface GitHubRepo {
  name: string;
  link: string;
}

const ProjectsAnalysis: React.FC = () => {
  const backlogs: BacklogItem[] = [];

  const todayProgress: TodayProgressItem[] = [
    {
      description: "Initial project setup and repository creation completed",
      author: "Vikash Singh",
      role: "Full Stack Developer",
      time: "09:30 am",
    },
    {
      description: "Database schema design for products and users finalized",
      author: "Vikash Singh",
      role: "Full Stack Developer",
      time: "11:15 am",
    },
    {
      description: "UI wireframes for product catalog page created",
      author: "Kavya Nair",
      role: "Frontend Developer",
      time: "02:20 pm",
    },
    {
      description: "Docker containerization setup for development environment",
      author: "Ankit Gupta",
      role: "DevOps Engineer",
      time: "03:45 pm",
    },
  ];

  const gitHubRepos: GitHubRepo[] = [
    { name: "ecommerce-platform-frontend", link: "https://github.com/team/ecommerce-frontend" },
    { name: "ecommerce-platform-backend", link: "https://github.com/team/ecommerce-backend" },
    { name: "ecommerce-platform-docs", link: "https://github.com/team/ecommerce-docs" },
  ];

  // Sample data for the linear graph
  const progressData = [
    { week: 'Week 1', progress: 5 },
    { week: 'Week 2', progress: 12 },
    { week: 'Week 3', progress: 18 },
    { week: 'Week 4', progress: 25 },
    { week: 'Week 5', progress: 35 },
    { week: 'Week 6', progress: 45 },
  ];

  const maxProgress = Math.max(...progressData.map(d => d.progress));

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FB5711] mb-8">
            Projects Analysis
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Progress Graph and Today's Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Graph */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
              <h2 className="text-xl font-medium mb-6 text-black">
                Progress Graph
              </h2>
              <div className="h-80 bg-gray-50 rounded-lg p-6">
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
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#FB5711"
                        strokeWidth="3"
                        points={progressData.map((point, index) => 
                          `${(index * 500) / (progressData.length - 1)},${200 - (point.progress / maxProgress) * 200}`
                        ).join(' ')}
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

              {/* Today's Progress */}
              <div className="mt-8">
                <h2 className="text-xl font-medium mb-6 text-[#FB5711]">
                  Today's Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {todayProgress.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg p-4 border border-green-200"
                    >
                      <p className="text-gray-800 font-medium mb-3">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <div className="text-gray-600">
                          <span>By </span>
                          <span className="font-medium">{item.author}</span>
                          <span> | {item.role}</span>
                        </div>
                        <span className="text-gray-500">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Backlogs and GitHub Repos */}
          <div className="lg:col-span-2 space-y-6 ">
            <div className="bg-white border border-gray-200 rounded-xl p-6 ">
              <h2 className="text-xl font-medium mb-6 text-black">Backlogs</h2>
              <div className="space-y-0">
                {backlogs.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <span className="text-gray-400 text-sm">No backlogs yet</span>
                  </div>
                ) : (
                  backlogs.map((backlog, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="text-gray-800 font-base">
                        {backlog.taskName}
                      </span>
                      <span className="text-gray-600 text-sm text-center">
                        {backlog.date}
                      </span>
                      <span className="text-gray-600 text-end">
                        {backlog.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* GitHub Repos */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-medium mb-6 text-black">
                GitHub Repos
              </h2>
              <div className="space-y-4">
                {gitHubRepos.map((repo, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-800 font-medium mb-1">
                          {repo.name}
                        </p>
                        <p className="text-sm text-gray-600">{repo.link}</p>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg bg-[#F9A6291A] transition-colors">
                        <MoveDiagonal className="w-4 h-4 text-[#FB5711]" />
                      </button>
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
};

export default ProjectsAnalysis;
