import { useReducer } from "react";
import { dbWriteTask } from "./firebase";

export function TaskList(props) {
    const { tasks } = props;
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col" className="col-1">
                        Done
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="col-2">
                        Due date
                    </th>
                    <th scope="col" className="col-2"></th>
                </tr>
            </thead>
            <tbody>{tasks}</tbody>
        </table>
    );
}

export function Task(props) {
    const { task: task_, deleteTask } = props;

    const reducer = (state, event) => ({ ...state, [event.name]: event.value });
    const [task, setTask] = useReducer(reducer, task_);

    const setDone = (done) => {
        setTask({ name: "done", value: done });
        task.done = done; // Need to update variable as well
        dbWriteTask(task);
    };

    const deleteBtn = (done) => {
        if (done) {
            return (
                <td style={{ textAlign: "center" }}>
                    <input
                        type="button"
                        className="btn btn-danger"
                        value="Delete"
                        onClick={() => deleteTask(task)}
                    />
                </td>
            );
        }
        return <></>;
    };

    return (
        <tr>
            <td>
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => setDone(!task.done)}
                ></input>
            </td>
            <td>
                <p>{task.name}</p>
            </td>
            <td style={{ whiteSpace: "pre" }}>
                <p>{task.description}</p>
            </td>
            <td>
                {task.date === ""
                    ? ""
                    : new Date(Date.parse(task.date)).toLocaleDateString()}
            </td>
            {deleteBtn(task.done)}
        </tr>
    );
}
