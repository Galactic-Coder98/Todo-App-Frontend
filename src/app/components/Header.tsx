import React from "react";

const Header = () => (
    <header className="bg-header-background text-white py-4 flex items-center justify-center h-[25vh]">
        <img src="/logo.svg" alt="To Do App logo" className="w-11 h-11 mr-2"/>
        <h1 className="text-5xl font-extrabold ">
            <p className="text-todo-font-color inline">Todo </p>
            <p className="text-app-font-color inline">App</p>
        </h1>
    </header>
);

export default Header;