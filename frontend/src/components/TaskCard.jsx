import React from "react";
import { Calendar, Edit3, Trash2 } from "lucide-react";

export default function TaskCard({ task, onEdit, onDelete }) {
  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {task.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4">{task.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span className="font-medium">
          Status:{" "}
          <span
            className={
              task.status === "Done"
                ? "text-green-600 font-semibold"
                : task.status === "In Progress"
                ? "text-blue-600 font-semibold"
                : "text-orange-600 font-semibold"
            }
          >
            {task.status}
          </span>
        </span>

        <span className="flex items-center gap-1">
          <Calendar size={15} className="text-gray-400" />
          {formattedDeadline}
        </span>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
        >
          <Edit3 size={16} /> Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}
