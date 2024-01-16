import { useContext, useRef } from "react";
import "./todos.css";
import { globalContext } from "../../globalContext/GlobalContextProvider";
import Swal from "sweetalert2";

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
      <div>
        <div className="header">
          <h2>My To Do List</h2>
          <form onSubmit={handeleSubmit}>
            <input
              name="discription"
              ref={inputRef}
              type="text"
              placeholder="Title..."
            />
            <button className="addBtn">Add</button>
          </form>
        </div>
      </div>
    </>
  );
}
