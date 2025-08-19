"use client"
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TaskCard {
  title: string;
  date: string;
  developerName: string;
  projectName: string;
}

const KanbanBoard: React.FC = () => {
  const router = useRouter();
  
  const todoTasks: TaskCard[] = [
    {
      title: "Design user registration and login pages",
      date: "25-06-2025",
      developerName: "Priya Patel",
      projectName: "E-commerce Platform"
    },
    {
      title: "Create product catalog database schema",
      date: "22-06-2025",
      developerName: "Arjun Sharma", 
      projectName: "E-commerce Platform"
    },
    {
      title: "Implement shopping cart functionality",
      date: "28-06-2025",
      developerName: "Sneha Reddy",
      projectName: "E-commerce Platform"
    },
    {
      title: "Design responsive homepage layout",
      date: "24-06-2025",
      developerName: "Rohit Kumar",
      projectName: "E-commerce Platform"
    },
    {
      title: "Set up payment gateway integration",
      date: "30-06-2025",
      developerName: "Vikash Singh",
      projectName: "E-commerce Platform"
    },
    {
      title: "Create admin dashboard wireframes",
      date: "26-06-2025",
      developerName: "Kavya Nair",
      projectName: "E-commerce Platform"
    }
  ];

  const inProgressTasks: TaskCard[] = [
    {
      title: "Set up project repository and folder structure",
      date: "20-06-2025",
      developerName: "Arjun Sharma",
      projectName: "E-commerce Platform"
    },
    {
      title: "Research and finalize tech stack (React, Node.js, MongoDB)",
      date: "21-06-2025",
      developerName: "Priya Patel",
      projectName: "E-commerce Platform"
    },
    {
      title: "Create initial wireframes for product pages",
      date: "23-06-2025",
      developerName: "Rohit Kumar",
      projectName: "E-commerce Platform"
    }
  ];

  const doneTasks: TaskCard[] = [
    {
      title: "Project kickoff meeting and requirements gathering",
      date: "18-06-2025",
      developerName: "Team Lead",
      projectName: "E-commerce Platform"
    },
    {
      title: "Set up development environment and tools",
      date: "19-06-2025",
      developerName: "Arjun Sharma",
      projectName: "E-commerce Platform"
    }
  ];

  const backlogTasks: TaskCard[] = [
    // Empty since project just started - no backlog items yet
  ];

const renderTaskCard = (task: TaskCard, index: number, columnColor: string) => (
  <div key={index} className={`bg-white rounded-lg p-2 px-4 mb-4 shadow-sm border-b-4 ${columnColor}`}>
    <p className="text-gray-800 text-sm mb-4 leading-relaxed font-semibold">
      {task.title}
    </p>
    
    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
      <span>{task.date}</span>
      <span>{task.developerName}</span>
    </div>

    {/* Separator Line */}
    <hr className="mb-2 border-gray-200" />

    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{task.projectName}</span>
      <div className="w-6 h-6 bg-[#F9A6291A] rounded flex items-center justify-center">
        <MessageSquare className='w-4 h-4 text-[#7f7b75]'/>
      </div>
    </div>
  </div>
);


  const renderColumn = (title: string, tasks: TaskCard[], count: number, columnColor: string) => (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-medium text-gray-800">{title}</h2>
          <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
            {count}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Plus className="w-5 h-5 text-[#FB5711]" />
        </button>
      </div>
      <div className={`bg-white rounded-lg p-4 min-h-[600px]`}>
        {tasks.map((task, index) => renderTaskCard(task, index, columnColor))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex space-x-6 border-b border-gray-200">
            <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">
              Board
            </button>
            <button className="pb-3 text-gray-500" onClick={() => router.push('/management/dashboard/calendar')}>
              Calendar
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {renderColumn("To - Do", todoTasks, 6, "border-b-blue-500")}
          {renderColumn("In Progress", inProgressTasks, 3, "border-b-yellow-500")}
          {renderColumn("Done", doneTasks, 2, "border-b-green-500")}
          {renderColumn("Backlogs", backlogTasks, 0, "border-b-red-500")}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
