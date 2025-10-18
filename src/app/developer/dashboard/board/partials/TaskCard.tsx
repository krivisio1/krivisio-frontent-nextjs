"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { TaskCard } from "../page";

const TaskCardComponent: React.FC<{ task: TaskCard; columnColor: string }> = ({
  task,
  columnColor,
}) => (
  <div
    className={`bg-white rounded-lg p-2 px-4 mb-4 shadow-sm border-b-4 ${columnColor}`}
  >
    <p className="text-gray-800 text-sm mb-4 leading-relaxed font-semibold">
      {task.title}
    </p>
    <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
      <span>{task.date}</span>
      <span>{task.developerName}</span>
    </div>
    <hr className="mb-2 border-gray-200" />
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">{task.projectName}</span>
      <div className="w-6 h-6 bg-[#F9A6291A] rounded flex items-center justify-center">
        <MessageSquare className="w-4 h-4 text-[#7f7b75]" />
      </div>
    </div>
  </div>
);

export default TaskCardComponent;
