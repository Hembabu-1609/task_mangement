import React, { useState, useEffect } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import FilterBar from "../components/FilterBar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const nav = useNavigate();

  async function fetchTasks() {
    const res = await api.get("/tasks");
    setTasks(res.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleEdit(task) {
    nav("/task-form", { state: { task } });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  }

  const filtered = tasks.filter(
    (t) =>
      (status ? t.status === status : true) &&
      (deadline ? t.deadline === deadline : true)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
 
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <span className="text-yellow-500 text-4xl">🗂️</span>
          Task Dashboard
        </h1>
        <button
          onClick={() => nav("/task-form")}
          className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
        >
          + Add Task
        </button>
      </header>

      
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <FilterBar
          status={status}
          setStatus={setStatus}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      </div>

      
      {filtered.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No tasks"
            className="w-40 opacity-60 mb-4"
          />
          <p className="text-gray-600 text-lg font-medium">
            No tasks found — start by adding one!
          </p>
        </div>
      )}
    </div>
  );
}
