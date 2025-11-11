import { useState, useReducer } from "react";
import "./index.css";

// REDUCER *******
import reducer from "./reducer.js";

// FILLER DATA *******
import data from "./data/tasks.js";

// COMPONENTS *******
import Header from "./components/Header";
import Footer from "./components/Footer.jsx";
import Tasks from "./components/Tasks";

function App() {
  // COMPONENT STATE MANAGEMENT *******
  const [newTask, setNewTask] = useState("");
  const [tasks, dispatch] = useReducer(reducer, data);
  // setting up the task I want to edit, initiate as null since it is the first render of tasks (taskToEdit will be the specific task's id)
  const [taskToEdit, setTaskToEdit] = useState(null);
  // setting up state to keep track of the editText input (editText will be the e.target.value)
  const [editText, setEditText] = useState("");

  // HANDLERS AND HELPER FUNCTIONS *******
  function handleInputChange(e) {
    // Using a controlled component to use the value from the Add Task input
    setNewTask(e.target.value);
  }

  function addTask() {
    dispatch({ type: "ADD", newTask });
    setNewTask("");
  }

  function editTask(id, newEdit) {
    // Tells the reducer to select edit as the action type, id and newEdit are apart of that action (data necessary) and need to be passed through to the reducer as well
    dispatch({ type: "EDIT", id, newEdit });
    // AFTER this function goes through the reducer process, then I can use the set state functions I have to "reset" the forms
    setEditText("");
    setTaskToEdit(null);
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", id });
  }

  function completeTask(id) {
    dispatch({ type: "COMPLETE", id });
  }

  function onEditClick(id, text) {
    setTaskToEdit(id); // remember which task is being edited
    setEditText(text); // preload the edit input with that specific task's text
  }

  // JSX AND ELEMENTS *******
  return (
    <>
      <Header />
      <div className="container">
        <input
          name="addTask"
          onChange={handleInputChange}
          placeholder="Enter a task here..."
          value={newTask}
          type="text"
        />
        <button className="addBtn" onClick={addTask}>
          ➕
        </button>

        <Tasks
          tasks={tasks}
          onEditClick={onEditClick}
          deleteTask={deleteTask}
          handleOnChange={completeTask}
        />

        {taskToEdit && (
          <>
            <input
              type="text"
              name="editTask"
              onChange={(e) => setEditText(e.target.value)}
              value={editText}
            />
            <button onClick={() => editTask(taskToEdit, editText)}>💾</button>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;
