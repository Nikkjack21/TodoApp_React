import "./App.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateForm from "./components/UpdateForm";
import ToDo from "./components/ToDo";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  //Tasks (ToDO Lists) state
  const [toDo, setTodo] = useState([]);

  //Temporary storing for state & Updating state for editing each task
  const [newTask, setNewTask] = useState("");
  const [update, setUpdate] = useState("");

  //Add task function
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, name: newTask, status: false };
      setTodo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //Delete task function
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setTodo(newTasks);
  };

  //Function to mark task as completed or not
  const markDone = (id) => {
    let statusTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTodo(statusTask);
  };

  //cancel/ clear input box while ediitng/updating.
  const cancelUpdate = () => {
    setUpdate("");
  };

  //Populate field in input box for editing/updating task.
  const changeTask = (e) => {
    let changeEntry = {
      id: update.id,
      name: e.target.value,
      status: update.status ? true : false,
    };
    setUpdate(changeEntry);
  };

  //Update task function
  const updateTask = () => {
    let filterRecords = [...toDo].filter((task) => task.id !== update.id);
    let updatedObject = [...filterRecords, update];
    setTodo(updatedObject);
    setUpdate("");
  };

  return (
    <div className="App">
      <br />
      <br />
      <h3> To Do List App in React</h3>
      <br />
      <br />

      {/* Update Task */}

      {update && update ? (
        <UpdateForm
          update={update}
          changeTask={changeTask}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {/* {Display ToDos} */}
      {toDo && toDo.length ? "" : "No Tasks...."}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdate={setUpdate}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
