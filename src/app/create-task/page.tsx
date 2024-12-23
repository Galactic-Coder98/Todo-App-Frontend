import Header from "../components/Header";
import CreateTaskForm from "../components/CreateTaskForm";

const CreateTask = () => (
    <div>
        <Header />
        <main className="w-[50vw] mx-auto">
            <CreateTaskForm />
        </main>
    </div>
);

export default CreateTask;