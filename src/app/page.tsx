import Header from "./components/Header";
import TaskList from "./components/TaskList";
import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="text-center w-[50vw] mx-auto flex flex-col mt-[-30px]">
        <Link href="/create-task">
          <button className="bg-create-task-bg text-white py-2 px-4 rounded-lg w-full h-14 text-sm font-bold flex items-center justify-center">
            Create Task
            <img src="/plus.svg" alt="Plus Icon" className="w-4 h-4 inline ml-2"/>
          </button>
        </Link>
        <TaskList />
      </main>
    </div>
  );
};

export default Home;