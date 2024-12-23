"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple", "pink", "brown"];

const CreateTaskForm = () => {
    const [title, setTitle] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        if (!title || !selectedColor) {
            setError("Both title and color are required.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:4000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    color: selectedColor,
                })
            });

            if (!response.ok) {
                throw new Error("Failed to create task.");
            }

            const data = await response.json();
            console.log("Task created successfully: ", data);

            router.push("/");
        } catch (err) {
            setError("Failed to create task. Please try again.");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label className="block text-sm mb-2 font-bold text-create-task-bg">Title</label>
                <input 
                    type="text"
                    placeholder="Ex. Brush your teeth"
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
                                selectedColor === color
                                    ? "ring-4 ring-white"
                                    : ""
                            }`}
                            style={{ backgroundColor: color }}
                        ></button>
                    ))}
                </div>

                <button 
                    type="submit"
                    className="mt-10 bg-create-task-bg w-full p-2 rounded-lg text-white font-bold text-sm h-12 flex items-center justify-center"
                    disabled={isSubmitting} // Disable button while submitting
                >
                    {isSubmitting ? (
                        <>
                            Creating task...
                            <img src="/spinner.svg" className="w-4 h-4 inline ml-2 animate-spin" />
                        </>
                    ) : (
                        <>
                            Add Task
                            <img src="/plus.svg" className="w-4 h-4 inline ml-2" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateTaskForm;
