import { useState } from "react";

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
    const { taskId, name, description, date, deleteTask } = props;
    const [done, setDone] = useState(false);

    const deleteBtn = (done) => {
        if (done) {
            return (
                <td style={{ textAlign: "center" }}>
                    <input
                        type="button"
                        className="btn btn-danger"
                        value="Delete"
                        onClick={() => deleteTask(taskId)}
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
                    value={done}
                    onClick={() => setDone(!done)}
                ></input>
            </td>
            <td>
                <p>{name}</p>
            </td>
            <td style={{ whiteSpace: "pre" }}>
                <p>{description}</p>
            </td>
            <td>
                {date === ""
                    ? ""
                    : new Date(Date.parse(date)).toLocaleDateString()}
            </td>
            {deleteBtn(done)}
        </tr>
    );
}
