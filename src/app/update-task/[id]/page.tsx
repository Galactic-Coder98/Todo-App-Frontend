import React from "react";
import UpdateTaskForm from "../../components/UpdateTaskForm";
import Header from "../../components/Header";

const UpdateTaskPage = () => {
    return (
        <div>
            <Header />
            <main className="w-[50vw] mx-auto">
                <UpdateTaskForm />
            </main>
        </div>
    )
}

export default UpdateTaskPage;