// "use client"
// import React from 'react';
// import { MessageSquare, Plus } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface TaskCard {
//   title: string;
//   date: string;
//   developerName: string;
//   projectName: string;
// }

// const KanbanBoard: React.FC = () => {
//   const router = useRouter();
//   const todoTasks: TaskCard[] = [
//   {
//     title: "Implement user registration form with validation and error handling",
//     date: "12-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Create responsive product listing page with pagination and sorting",
//     date: "15-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Design and code shopping cart sidebar with quantity controls",
//     date: "18-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Build product filter component with category and price range options",
//     date: "20-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   }
// ];

// const inProgressTasks: TaskCard[] = [
//   {
//     title: "Develop product card component with hover effects and add-to-cart button",
//     date: "08-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Create user login form with remember me functionality and forgot password link",
//     date: "10-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   }
// ];

// const doneTasks: TaskCard[] = [
//   {
//     title: "Set up Next.js project structure and configure Tailwind CSS",
//     date: "05-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Create header navigation component with logo, search bar, and user menu",
//     date: "06-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   },
//   {
//     title: "Design and implement responsive footer with links and social media icons",
//     date: "07-08-2025",
//     developerName: "Kavya Nair",
//     projectName: "E-commerce Platform"
//   }
// ];

// const backlogTasks: TaskCard[] = [];


// const renderTaskCard = (task: TaskCard, index: number, columnColor: string) => (
//   <div key={index} className={`bg-white rounded-lg p-2 px-4 mb-4 shadow-sm border-b-4 ${columnColor}`}>
//     <p className="text-gray-800 text-sm mb-4 leading-relaxed font-semibold">
//       {task.title}
//     </p>
    
//     <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
//       <span>{task.date}</span>
//       <span>{task.developerName}</span>
//     </div>

//     {/* Separator Line */}
//     <hr className="mb-2 border-gray-200" />

//     <div className="flex justify-between items-center">
//       <span className="text-xs text-gray-500">{task.projectName}</span>
//       <div className="w-6 h-6 bg-[#F9A6291A] rounded flex items-center justify-center">
//         <MessageSquare className='w-4 h-4 text-[#7f7b75]'/>
//       </div>
//     </div>
//   </div>
// );


//   const renderColumn = (title: string, tasks: TaskCard[], count: number, columnColor: string) => (
//     <div className="flex-1">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center space-x-3">
//           <h2 className="text-lg font-medium text-gray-800">{title}</h2>
//           <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
//             {count}
//           </span>
//         </div>
//         <button className="p-1 hover:bg-gray-100 rounded">
//           <Plus className="w-5 h-5 text-[#FB5711]" />
//         </button>
//       </div>
//       <div className={`bg-white rounded-lg p-4 min-h-[600px]`}>
//         {tasks.map((task, index) => renderTaskCard(task, index, columnColor))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex space-x-6 border-b border-gray-200">
//             <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">
//               Board
//             </button>
//             <button className="pb-3 text-gray-500" onClick={() => router.push('/developer/dashboard/calendar')}>
//               Calendar
//             </button>
//           </div>
//         </div>

//         {/* Kanban Board */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {renderColumn("To - Do", todoTasks, 4, "border-b-blue-500")}
//           {renderColumn("In Progress", inProgressTasks, 2, "border-b-yellow-500")}
//           {renderColumn("Done", doneTasks, 3, "border-b-green-500")}
//           {renderColumn("Backlogs", backlogTasks, 0, "border-b-red-500")}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KanbanBoard;
"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import KanbanColumn from "./partials/KanbanColumn";
import AddTaskModal from "./partials/AddTaskModal";

export interface TaskCard {
  title: string;
  date: string;
  developerName: string;
  projectName: string;
}

export type TaskStatus = "todo" | "inProgress" | "done" | "backlog";

export default function KanbanBoard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Record<TaskStatus, TaskCard[]>>({
    todo: [
      {
        title: "Implement user registration form with validation and error handling",
        date: "12-08-2025",
        developerName: "Kavya Nair",
        projectName: "E-commerce Platform",
      },
    ],
    inProgress: [
      {
        title: "Develop product card component with hover effects",
        date: "08-08-2025",
        developerName: "Kavya Nair",
        projectName: "E-commerce Platform",
      },
    ],
    done: [
      {
        title: "Set up Next.js project structure and configure Tailwind CSS",
        date: "05-08-2025",
        developerName: "Kavya Nair",
        projectName: "E-commerce Platform",
      },
    ],
    backlog: [],
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState<TaskStatus>("todo");

  const handleAddTask = (status: TaskStatus) => {
    setDefaultStatus(status);
    setModalOpen(true);
  };

  const addNewTask = (status: TaskStatus, newTask: TaskCard) => {
    setTasks((prev) => ({
      ...prev,
      [status]: [...prev[status], newTask],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex space-x-6 border-b border-gray-200">
            <button className="pb-3 border-b-2 border-[#FB5711] text-[#FB5711] font-medium">
              Board
            </button>
            <button
              className="pb-3 text-gray-500"
              onClick={() => router.push("/developer/dashboard/calendar")}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KanbanColumn
            title="To-Do"
            color="border-b-blue-500"
            tasks={tasks.todo}
            onAdd={() => handleAddTask("todo")}
          />
          <KanbanColumn
            title="In Progress"
            color="border-b-yellow-500"
            tasks={tasks.inProgress}
            onAdd={() => handleAddTask("inProgress")}
          />
          <KanbanColumn
            title="Done"
            color="border-b-green-500"
            tasks={tasks.done}
            onAdd={() => handleAddTask("done")}
          />
          <KanbanColumn
            title="Backlog"
            color="border-b-red-500"
            tasks={tasks.backlog}
            onAdd={() => handleAddTask("backlog")}
          />
        </div>
      </div>

      {modalOpen && (
        <AddTaskModal
          defaultStatus={defaultStatus}
          onClose={() => setModalOpen(false)}
          onSubmit={addNewTask}
        />
      )}
    </div>
  );
}
