import { useContext, useRef } from "react";
import "./todos.css";
import { globalContext } from "../../globalContext/GlobalContextProvider";
import Swal from "sweetalert2";
import Listtodo from "../listItem/Listtodo";

export default function Todos() {
  const { state, dispatch } = useContext(globalContext);
  const inputRef = useRef(null);

  const handeleSubmit = (e) => {
    e.preventDefault();
    const todos = {
      discription: e.target.discription.value,
      isComplet: false,
      isEdite: false,
      id: Date.now(),
    };

    if (!todos.discription.trim()) {
      Swal.fire({
        title: "Error!",
        text: "please give some text",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }
    const isDuplicate = state.todos.some(
      (todo) => todo.discription === todos.discription
    );
    if (isDuplicate) {
      Swal.fire({
        title: "Error!",
        text: "Dont Give the same value",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }
    dispatch({ type: "ADD_VALUE", payload: todos });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="todo-section">
        <div className="todo-container">
          <div className="header">
            <h2>My To Do List</h2>
            <form onSubmit={handeleSubmit}>
              <input
                name="discription"
                ref={inputRef}
                type="text"
                placeholder="Add todo..."
                maxLength={40}
              />
              <button className="addBtn">Add</button>
            </form>
          </div>
          <ul className="list-container">
            {state.todos.length !== 0 ? (
              state.todos.map((todo) => <Listtodo key={todo.id} todo={todo} />)
            ) : (
              <div className="no_task">
                <img src="./confused.png" alt="NO TASK" />
                <h1>There is no task</h1>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
