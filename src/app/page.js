"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";
import styles from "./globals.css"; // Ensure you have your global styles imported

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.body}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">To-Do List</h1>
          <form onSubmit={addTask} className="flex mb-8">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-1 p-4 bg-gray-700 text-white border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-lg"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-4 rounded-r-md hover:bg-indigo-700 transition flex items-center justify-center"
            >
              <FaPlus className="text-lg" />
            </button>
          </form>
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-md hover:bg-gray-600 transition"
              >
                <div className="flex items-center w-full">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 transition flex-shrink-0 ${
                      task.completed
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {task.completed && <FaCheck className="text-white text-sm" />}
                  </button>
                  <span
                    className={`text-lg truncate flex-1 pr-4 ${
                      task.completed ? "font-bold text-green-400" : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-500 transition flex-shrink-0"
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}