import React, { useCallback, useEffect, useState } from "react";
import ReactDom from "react-dom";
import AddTask from "./addtask";
import { dbDeleteTask, dbGetTasks } from "./firebase";
import { Task, TaskList } from "./tasklist";

// Example task
// { name: "example task", description: "Amogus sus" };

function Root() {
    const [tasks, setTasks] = useState([]);

    const addTask = useCallback(
        (props) => {
            setTasks((tasks) => [
                ...tasks,
                <Task
                    task={props}
                    key={props.taskId}
                    deleteTask={deleteTask}
                />,
            ]);
        },
        [setTasks]
    );

    const deleteTask = (task) => {
        dbDeleteTask(task);
        setTasks((tasks) =>
            tasks.filter(
                (otherTask) => otherTask.props.task.taskId !== task.taskId
            )
        );
    };

    // Run on startup - load tasks from firebase db.
    useEffect(() => {
        async function initializeTasks() {
            let snapshot;
            try {
                snapshot = await dbGetTasks();
            } catch (e) {
                console.error(e);
            }

            let tasks = {};
            if (snapshot.exists()) {
                tasks = snapshot.val();
            }

            if (tasks) {
                // eslint-disable-next-line
                for (const [_, value] of Object.entries(tasks)) {
                    addTask(value);
                }
            }
        }

        initializeTasks();
    }, [addTask]);

    return (
        <div className="container mt-3">
            <div className="text-center">
                <h1>Task list</h1>
            </div>
            <section>
                <AddTask addTask={addTask} />
                <h1>Tasks</h1>
                <TaskList tasks={tasks} />
            </section>
        </div>
    );
}

ReactDom.render(<Root />, document.getElementById("root"));
