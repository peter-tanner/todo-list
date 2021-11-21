import React, { useState } from "react";
import ReactDom from "react-dom";
import AddTask from "./addtask";
import { Task, TaskList } from "./tasklist";

// Example task
// { name: "example task", description: "Amogus sus" };

function Root() {
    const [taskNumber, setTaskNumber] = useState(0);
    const [tasks, setTasks] = useState([]);

    const addNewTask = (props) => {
        setTasks((tasks) => [
            ...tasks,
            <Task
                {...props}
                key={taskNumber}
                taskId={taskNumber}
                deleteTask={deleteTask}
            />,
        ]);
        setTaskNumber((taskNumber) => taskNumber + 1);
    };

    const deleteTask = (id) => {
        setTasks((tasks) => tasks.filter((task) => task.props.taskId !== id));
    };

    return (
        <div className="container mt-3">
            <div className="text-center">
                <h1>Task list</h1>
            </div>
            <section>
                <AddTask addTask={addNewTask} />
                <h1>Tasks</h1>
                <TaskList tasks={tasks} />
            </section>
        </div>
    );
}

ReactDom.render(<Root />, document.getElementById("root"));
