import { useState } from "react";

export default function Tasks({ tasks, handleOnChange, deleteTask, setTaskToEdit }) {

  return (
    <ul className="tasks" role="list">
      {tasks.map((t) => {
        // console.log(`This is my new task: ${t} at this index of ${i}`)
        return (
          <li key={t.id}>
            <input
              type="checkbox"
              id={t.id}
              name="task"
              checked={t.completed}
              onChange={() => handleOnChange(t.id)}
            />
            <span className={t.completed ? "completed" : null}>{t.text}</span>
            <button className="edit-btn" onClick={() => setTaskToEdit(t.id)}>🖊️</button>
            {/*  when this specific button is clicked, call deleteTask and pass in the id for this particular task (t.id) */}
            <button
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


// onClick={() => setTaskToEdit(t.id)}