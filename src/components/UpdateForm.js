import React from "react";

function UpdateForm({ update, changeTask, updateTask, cancelUpdate }) {
  return (
    <div>
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
    </div>
  );
}

export default UpdateForm;
