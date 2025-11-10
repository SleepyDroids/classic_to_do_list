export default function reducer(state, action) {
  // Current functions that affect tasks: addTask, editTask, completeTask and deleteTask
  // so four functions that depend on state (in this case, the data)
  // e.g. tasks.filter() --> state.filter()

  switch (action.type) {
    case "DELETE":
      return state.filter((task) => task.id !== action.id);
    case "COMPLETE":
      return state.map((task) => {
        return task.id === action.id
          ? { ...task, completed: !task.completed }
          : task;
      });
    case "ADD":
      const addNewTask = {
        id: Date.now(),
        text: action.newTask,
        completed: false,
      };

      if (action.newTask.trim() !== "") {
        return [addNewTask, ...state];
      } else {
        return state;
      }
    case "EDIT":
      const editedTasks = state.map((task) => {
        return task.id == action.id ? { ...task, text: action.newEdit } : task;
      });
      // needed to change editText here bc of scope within conpoments, reducer cannot read editText. It can only see data I pass as an action so action.newEdit needs to match newEdit.trim() otherwise it returns as undefined
      if (action.newEdit.trim() !== "") {
        return editedTasks;
      } else {
        return state;
      }
    default:
      return state;
  }
}
