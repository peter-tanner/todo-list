import React, { useReducer, useState } from "react";
import { RESET_ACTION } from "./action";
import { dbWriteTask, newTaskId } from "./firebase";

export function AddTask(props) {
    const [showForm, setShowForm] = useState(false);
    const toggleForm = () => setShowForm(!showForm);

    return (
        <>
            <div className="text-center">
                <input
                    type="button"
                    className="btn btn-primary justify-content-center m-1"
                    value="Create new tasks"
                    onClick={toggleForm}
                />
            </div>
            <AddTaskForm show={showForm} toggleForm={toggleForm} {...props} />
        </>
    );
}

function AddTaskForm(props) {
    const { addTask, show, toggleForm } = props;

    const INITIAL_STATE = {
        done: false,
        name: "",
        description: "",
        date: "",
        taskId: -1,
    };
    const reducer = (state, event) => {
        switch (event.type) {
            case RESET_ACTION.type:
                return INITIAL_STATE;
            default:
                // Form
                return { ...state, [event.target.name]: event.target.value };
        }
    };
    const [task, setTask] = useReducer(reducer, INITIAL_STATE);

    if (!show) {
        return <></>;
    }

    const handleSubmit = (event) => {
        task.taskId = newTaskId();
        addTask(task);
        dbWriteTask(task);
        setTask(RESET_ACTION);
        event.preventDefault();
    };

    const cancelForm = () => {
        setTask(RESET_ACTION);
        toggleForm();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-task-name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="new-task-name"
                        value={task.name}
                        onChange={setTask}
                        required={true}
                    />

                    <label htmlFor="new-task-description">Description</label>
                    <textarea
                        className="form-control"
                        id="new-task-description"
                        name="description"
                        rows="3"
                        value={task.description}
                        onChange={setTask}
                    ></textarea>

                    <label htmlFor="new-task-due-date">Due date</label>
                    <input
                        type="date"
                        className="input-group date"
                        id="new-task-due-date"
                        value={task.date}
                        onChange={setTask}
                        name="date"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-primary m-1"
                        value="Submit"
                    />
                    <input
                        type="button"
                        className="btn btn-danger m-1"
                        value="Cancel"
                        onClick={cancelForm}
                    />
                </div>
            </form>
        </>
    );
}

export default AddTask;
