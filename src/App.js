import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

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
        <>
          <div className="row">
            <div className="col">
              <input
                value={update && update.name}
                onChange={(e) => changeTask(e)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button
                onClick={updateTask}
                className="btn btn-lg btn-success mr-20"
              >
                Update
              </button>
              <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          {/* Add Task */}
          <div className="row">
            <div className="col">
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-success">
                Add Task{" "}
              </button>
            </div>
          </div>
          <br />
        </>
      )}

      {/* {Display ToDos} */}
      {toDo && toDo.length ? "" : "No Tasks...."}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? "done" : ""}>
                    <span className="taskNumber"> {index + 1}</span>
                    <span className="taskText"> {task.name}</span>
                  </div>
                  <div className="iconsWrap">
                    <span
                      title="Completed / Not Completed"
                      onClick={(e) => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.status ? null : (
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdate({
                            id: task.id,
                            name: task.name,
                            status: task.status ? true : false,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
