import React from "react";
import { Search, Filter } from "lucide-react";

export default function FilterBar({ status, setStatus, deadline, setDeadline }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-100">
      
      
      <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-full md:w-1/3 focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="text-gray-500 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full focus:outline-none text-gray-700 placeholder-gray-400"
        />
      </div>

      
      <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">

        
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <Filter className="text-gray-500" size={18} />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="focus:outline-none bg-transparent text-gray-700"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <label htmlFor="deadline" className="text-sm text-gray-600">
            Deadline:
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="focus:outline-none bg-transparent text-gray-700"
          />
        </div>

        
        <button
          onClick={() => {
            setStatus("");
            setDeadline("");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
