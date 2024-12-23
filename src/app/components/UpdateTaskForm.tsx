"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink", "brown"];

const UpdateTaskForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTask = async () => {
            if (!id) {
                setError("No task ID provided.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/tasks/${id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch task.");
                }

                const data = await response.json();
                setTitle(data.title || "");
                setSelectedColor(data.color || "");
            } catch (err) {
                setError("Failed to load task. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!title || !selectedColor) {
            setError("Both title and color are required.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    color: selectedColor,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update task.");
            }

            const data = await response.json();
            console.log("Task updated successfully: ", data);

            router.push("/");
        } catch (err) {
            setError("Failed to update task. Please try again.");
            console.error(err);
        }
    };

    if (loading) {
        return <p className="text-white text-center">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <div className="p-6 w-full text-white rounded-lg mt-10">
            <button 
                className="mb-6"
                onClick={() => router.back()}
                aria-label="Go Back"
            >
                <img src="/arrow-left.svg" alt="back arrow" className="w-5 h-5"/>
            </button>
            <form onSubmit={handleSubmit}>
                <label className="block text-sm mb-2 font-bold text-create-task-bg">Title</label>
                <input
                    type="text"
                    placeholder="Ex. Brush your teeth."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 rounded-lg text-white h-12"
                    style={{ backgroundColor: "#333333" }}
                />

                <label className="block text-sm mb-2 font-bold text-create-task-bg">Color</label>
                <div className="flex gap-4 mb-4">
                    {colors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`h-12 w-12 rounded-full ${
                                selectedColor === color ? "ring-4 ring-white" : ""
                            }`}
                            style={{ backgroundColor: color }}
                        ></button>
                    ))}
                </div>

                <button 
                    type="submit"
                    className="mt-10 bg-create-task-bg w-full p-2 rounded-lg text-white font-bold text-sm h-12 flex items-center justify-center"
                >
                    Save
                    <img src="/plus.svg" className="w-4 h-4 inline ml-2" />
                </button>
            </form>
        </div>
    );
};

export default UpdateTaskForm;
