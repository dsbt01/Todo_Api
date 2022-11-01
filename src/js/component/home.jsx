import React, { useState } from "react";

let globalList = [];
let index = -1;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [, setCount] = useState(0);

  function handleRemove(id) {
    let indexToDelete = -1;

    for (let i = 0; i < globalList.length; i++) {
      if (globalList[i].id === id) {
        indexToDelete = i;
      }
    }

    if (indexToDelete != -1) {
      globalList.splice(indexToDelete, 1);

      //reset the whole global list
      for (let i = 0; i < globalList.length; i++) {
        globalList[i].id = i;
      }

      index = globalList.length - 1;

      alert("Delete was successful");

      // force a re-render:
      setCount((c) => c + 1);
    }
  }

  function addTodo() {
    if (inputValue === "") {
      alert("Please enter a valid task");
    } else {
      index += 1;

      let newItem = {
        id: index,
        text: inputValue,
      };

      globalList.push(newItem);

      setInputValue("");
    }
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      addTodo();
    }
  }

  return (
    <div className="container">
      <div className="main-div">
        <p>To Do's</p>
        <div className="input-div">
          <div className="row">
            <div className="col-10">
              <input
                type="text"
                onKeyDown={(e) => keyPress(e)}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              ></input>
            </div>
            <div className="col-1">
              <button id="my_add_btn" onClick={() => addTodo()}>
                Task
              </button>
            </div>
          </div>
          <ul id="my-list" className="todo-container">
            {globalList.length > 0 ? (
              globalList.map((item) => (
                <li key={item.id}>
                  <span>{item.text}</span>
                  <button
                    id="delete-btn"
                    type="button"
                    onClick={() => handleRemove(item.id)}
                  >
                    X
                  </button>
                </li>
              ))
            ) : (
              <h3>No tasks, Add a task</h3>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
