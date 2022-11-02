import React, { useEffect, useState } from "react";

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
        done: false,
        label: inputValue,
      };

	  console.log(newItem);
	  
      globalList.push(newItem);

	  console.log(globalList);

      //now push the value to the web api
      fetch("https://assets.breatheco.de/apis/fake/todos/user/DSBT", {
        method: "PUT",
        body: JSON.stringify(globalList),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          console.log(resp.ok); // will be true if the response is successfull
          console.log(resp.status); // the status code = 200 or code = 400 etc.
          console.log(resp.text()); // will try return the exact result as string
          return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
        })
        .then((data) => {
          //here is were your code should start after the fetch finishes
          console.log(data); //this will print on the console the exact object received from the server
          RefreshData();
        })
        .catch((error) => {
          //error handling
          console.log(error);
        });

      setInputValue("");
    }
  }

  function keyPress(e) {
    if (e.keyCode === 13) {
      addTodo();
    }
  }

  function RefreshData() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/DSBT", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        // Read the response as json.
        return response.json();
      })
      .then((responseAsJson) => {
        for (let i = 0; i < responseAsJson.length; i++) {
          console.log(responseAsJson[i]);
          globalList.push(responseAsJson[i]);
        }

        //refresh screen
        setCount((c) => c + 1);
      })
      .catch((error) => {
        console.log("Looks like there was a problem: \n", error);
      });
  }

  useEffect(() => {
    RefreshData();
  }, []);

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
              globalList.map((item, index) => (
                <li key={index}>
                  <span>{item.label}</span>
                  <button
                    id="delete-btn"
                    type="button"
                    onClick={() => handleRemove(index)}
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
