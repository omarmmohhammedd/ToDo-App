import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const App = () => {
  const [tasklist, Settasklist] = useState([]);
  const taskvalue = useRef("");
  useEffect(() => {
    if (localStorage.getItem("data")) {
      Settasklist(JSON.parse(localStorage.getItem("data")));
    } else {
      localStorage.setItem("data", JSON.stringify(tasklist));
    }
  }, []);
  const Add_Task = () => {
    if (taskvalue.current.value !== "") {
      let data = JSON.parse(localStorage.getItem("data"));
      data.push({ id: 1, name: taskvalue.current.value });
      let id = 0;
      data.forEach((e) => {
        id += 1;
        e.id = id;
      });
      Settasklist(data);
      localStorage.setItem("data", JSON.stringify(data));
      taskvalue.current.value = "";
    }
  };
  const RemoveTask = (name) => {
    let data = JSON.parse(localStorage.getItem("data"));

    data.forEach((e) => {
      if (e.name === name) {
    
        data.splice(data.indexOf(e),1);
        let id = 0;
        data.forEach((e) => {
          id += 1;
          e.id = id;
        });
        Settasklist(data);
        localStorage.setItem("data", JSON.stringify(data));
      }
    });
  };
  const Remove_All = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    data = [];
    Settasklist(data);
    localStorage.setItem("data", JSON.stringify(data));
  };
  return (
    <div className='App'>
      <div className='Wrapper'>
        <div className='Header'>
          <span>To Do App</span>
        </div>
        <div className='input-con'>
          <input type='text' placeholder='Add Your New ToDo' ref={taskvalue} maxLength="40"/>
          <button id='Add' onClick={() => Add_Task()}>
            +
          </button>
        </div>
        <div className='Tasks'>
          {tasklist.length ? (
            tasklist.map((task) => {
              return (
                <div className='task' key={task.id}>
                  <span>
                    {task.id} - {task.name}
                  </span>
                  <button onClick={() => RemoveTask(task.name)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              );
            })
          ) : (
            <div className='Empty'>No Tasks Added</div>
          )}
          {tasklist.length > 2 ? (
            <div className='Bottom-con'>
              <div className='task_count'>
                You Have <span>{tasklist.length}</span> Pending Task To Complete
              </div>
              <button id='Clear' onClick={() => Remove_All()}>
                Clear All
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
