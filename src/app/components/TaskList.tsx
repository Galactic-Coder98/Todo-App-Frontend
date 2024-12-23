"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

type Task = {
    id: number;
    title: string;
    color: string;
    completed: boolean;
};

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch("http://localhost:4000/tasks");

                if (!response.ok) {
                    throw new Error("Failed to fetch tasks.");
                }

                const data = await response.json();
                setTasks(data);
                setLoading(false);
            } catch (error) {
                setError("Failed to load tasks.");
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const deleteTask = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error deleting task.");
            }

            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            setError("Error deleting task.");
        }
    };

    const toggleTaskCompleted = async (id: number, title: string, color: string, completed: boolean) => {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: title, color: color, completed: !completed }),
            });

            if (!response.ok) {
                throw new Error("Error updating task completion.");
            }

            const updatedTask = await response.json();
            setTasks((prevTasks) => 
                prevTasks.map((task) =>
                    task.id === id ? { ...task, completed: updatedTask.completed } : task
                )
            ); 
        } catch (error) {
            setError("Error updating task ");
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center py-10">
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center py-10">
                <p>{error}</p>
            </div>
        );
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    return (
        <div className="flex flex-col items-center py-10">
            {tasks.length === 0 ? (
                <p>
                    You don't have any tasks registered yet. Create tasks and organize your to-dos.
                </p>
            ) : (
                <div className="w-full flex flex-col">
                    <div className="mb-4 flex flex-row justify-between text-sm font-bold">
                        <div className="text-task-count-color flex items-center gap-2">
                            Tasks <div className="rounded-lg text-white flex items-center justify-center" style={{ backgroundColor: "#262626", padding: '0.2rem 1rem' }}>{totalTasks}</div>
                        </div>
                        <div className="text-completed-count-color flex items-center gap-2">
                            Completed <div className="rounded-lg text-white flex items-center justify-center" style={{ backgroundColor: "#262626", padding: '0.2rem 1rem' }}>{completedTasks} de {totalTasks}</div>
                        </div>
                    </div>
                    <div>
                        <ul className="space-y-4 w-full">
                            {tasks.map((task) => (
                                <li 
                                    key={task.id}
                                    className="text-sm h-20 p-4 rounded-lg flex justify-between items-center bg-card-bg"
                                >
                                    <label className="flex items-center">
                                        <input 
                                            type="checkbox"
                                            checked={task.completed}
                                            className="hidden"
                                            onChange={() => toggleTaskCompleted(task.id, task.title, task.color, task.completed)}
                                        />
                                        <div className={`w-5 h-5 rounded-full border-2 border-blue-500 ${task.completed ? 'border-blue-500 bg-blue-500' : 'border-blue-500'}`} />
                                    </label>
                                    <Link href={`/update-task/${task.id}`}>
                                        <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                                            {task.title}
                                        </span>
                                    </Link>
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="ml-4"
                                        aria-label="Delete Task"
                                    >
                                        <img 
                                            src="/trash.svg"
                                            alt="Delete Task"
                                            className="w-6 h-6 hover:opacity-75"
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );  
};

export default TaskList;