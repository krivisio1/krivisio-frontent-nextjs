"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskCard, TaskStatus } from "../page";

const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  date: z.string().min(1, "Date is required."),
  developerName: z.string().min(2, "Developer name required."),
  projectName: z.string().min(2, "Project name required."),
  status: z.enum(["todo", "inProgress", "done", "backlog"]),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface AddTaskModalProps {
  defaultStatus: TaskStatus;
  onClose: () => void;
  onSubmit: (status: TaskStatus, task: TaskCard) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  defaultStatus,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: { status: defaultStatus },
  });

  const submitForm = (data: TaskFormValues) => {
    const { status, ...taskData } = data;
    onSubmit(status, taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Add New Task
        </h2>

        <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input
              {...register("title")}
              className="w-full mt-1 border rounded-md p-2 text-sm"
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full mt-1 border rounded-md p-2 text-sm"
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Developer Name</label>
            <input
              {...register("developerName")}
              className="w-full mt-1 border rounded-md p-2 text-sm"
              placeholder="Developer name"
            />
            {errors.developerName && (
              <p className="text-red-500 text-xs">
                {errors.developerName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Project Name</label>
            <input
              {...register("projectName")}
              className="w-full mt-1 border rounded-md p-2 text-sm"
              placeholder="Project name"
            />
            {errors.projectName && (
              <p className="text-red-500 text-xs">
                {errors.projectName.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full mt-1 border rounded-md p-2 text-sm"
            >
              <option value="todo">To-Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
              <option value="backlog">Backlog</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs">{errors.status.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 text-sm rounded-md bg-[#FB5711] text-white hover:bg-[#e14d0f]"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
