"use client";

import React from "react";
import { Plus } from "lucide-react";
import TaskCardComponent from "./TaskCard";
import { TaskCard } from "../page";

interface KanbanColumnProps {
  title: string;
  color: string;
  tasks: TaskCard[];
  onAdd: () => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  color,
  tasks,
  onAdd,
}) => (
  <div className="flex-1">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-3">
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      <button
        className="p-1 hover:bg-gray-100 rounded transition"
        onClick={onAdd}
      >
        <Plus className="w-5 h-5 text-[#FB5711]" />
      </button>
    </div>

    <div className="bg-white rounded-lg p-4 min-h-[600px]">
      {tasks.map((task, i) => (
        <TaskCardComponent key={i} task={task} columnColor={color} />
      ))}
    </div>
  </div>
);

export default KanbanColumn;
