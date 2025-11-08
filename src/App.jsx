import { useState } from "react";
import "./index.css";

/*
Requirements: 
- List of items that include: 
1) checkbox to indicate whether or not an item is complete
2) A delete button to remove the task from the list (can grab items by index? filter?)
        2a) delete button should be disabled unless the task is complete! 
3) An "edit" button that replaces the todo string with a text input used to edit the todo.
        3a) Hint: bind the value of this text input to a piece of state so that it is always accurate, even when first displayed!
        3b) When this text input is active, the "delete" and "edit" buttons should be hidden, and a "save" button should appear. The "save" button should save any changes made to the todo within the text input.
4) An input element that creates new todo items and adds them to the list. (Simply add to the list items)
5) New todos should be added to the top of the list visually; the oldest todos should be at the bottom.
*/

// FILLER DATA
import data from "./data/tasks.js";

// COMPONENTS
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  // STATE MANAGEMENT
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState(data);

  // setting up the task I want to edit, initiate as null since it is the first render of tasks (taskToEdit will be the specific task's id)
  const [taskToEdit, setTaskToEdit] = useState(null);
  // setting up state to keep track of the editText input (editText will be the e.target.value)
  const [editText, setEditText] = useState("");

  function handleInputChange(e) {
    // Using a controlled component to use the value from the Add Task input
    setNewTask(e.target.value);
  }

  function addTask() {
    const addNewTask = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    if (newTask.trim() !== "") {
      setTasks((prev) => [addNewTask, ...prev]);
      setNewTask("");
    }
  }

  function editTask(id, newEdit) {
    const editedTasks = tasks.map((task) => {
      return task.id == id ? { ...task, text: newEdit } : task;
    });

    if (editText.trim() !== "") {
      setTasks(editedTasks);
      setEditText("");
    }
  }

  function onEditClick(id, text) {
    setTaskToEdit(id);
    setEditText(text);
  }

  function deleteTask(id) {
    // use .filter to create a *new* array of tasks
    // for each task in the array, only keep it if its id does NOT match the id we passed in
    setTasks(tasks.filter((task) => task.id !== id));
    // ^ this means: "remove the one task whose id matches the one we clicked on"
    // React will then re-render using this updated tasks array
  }

  function completeTask(id) {
    const complete = tasks.map((task) => {
      // console.log(task.completed)
      return task.id == id ? { ...task, completed: !task.completed } : task;
    });

    setTasks(complete);
  }

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
          taskToEdit={taskToEdit}
          onEditClick={onEditClick}
          deleteTask={deleteTask}
          handleOnChange={completeTask}
        />

        <input
          type="text"
          name="editTask"
          onChange={(e) => setEditText(e.target.value)}
          value={editText}
        />
        <button onClick={() => editTask(taskToEdit, editText)}>💾</button>
      </div>
    </>
  );
}

export default App;
