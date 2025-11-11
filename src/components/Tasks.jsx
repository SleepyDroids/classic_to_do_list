import { useState } from "react";

export default function Tasks({
  tasks,
  handleOnChange,
  deleteTask,
  onEditClick,
}) {
  return (
    <ul className="tasks" role="list">
      {tasks.map((t) => {
        return (
          <li className="task-item" key={t.id}>
            <label>
              <input
                type="checkbox"
                id={t.id}
                name="task"
                checked={t.completed}
                onChange={() => handleOnChange(t.id)}
              />
              <span
                className={t.completed ? "task-text completed" : "task-text"}
              >
                {t.text}
              </span>
            </label>
            <button
              aria-label="Edit Task"
              className="edit-btn"
              onClick={() => onEditClick(t.id, t.text)}
            >
              🖊️
            </button>
            {/*  when this specific button is clicked, call deleteTask and pass in the id for this particular task (t.id) */}
            <button
              aria-label="Delete Task"
              className="del-btn"
              onClick={() => deleteTask(t.id)}
              disabled={t.completed ? false : true}
            >
              ❌
            </button>
          </li>
        );
      })}
      {/* End of tasks map and building of elements for each task */}
    </ul>
  );
}
