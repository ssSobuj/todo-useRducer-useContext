/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaRegSquareCheck } from "react-icons/fa6";
import { ImCheckboxUnchecked } from "react-icons/im";
import { globalContext } from "../../globalContext/GlobalContextProvider";
import Swal from "sweetalert2";

export default function Listtodo({ todo }) {
  const [editInputValu, setEditInputValu] = useState(todo.discription);
  const { dispatch } = useContext(globalContext);
  const togoleIscomplete = () =>
    dispatch({ type: "COMPLET_TODO", payload: todo.id });

  const handeleDelet = () => {
    dispatch({ type: "DELET_TODO", payload: todo.id });
  };
  const updateTodo = () => {
    if (todo.isComplet) {
      Swal.fire({
        title: "Error!",
        text: "You complet your task",
        icon: "error",
        confirmButtonText: "Cool",
      });
      return;
    }
    dispatch({
      type: "ISEDIT_TODO",
      payload: {
        editInputValu,
        id: todo.id,
      },
    });
  };

  return (
    <li key={todo.discription + todo.id}>
      <div>
        {todo.isComplet ? (
          <FaRegSquareCheck onClick={togoleIscomplete} />
        ) : (
          <ImCheckboxUnchecked onClick={togoleIscomplete} />
        )}
      </div>
      <div>
        {!todo.isEdite ? (
          <p className={todo.isComplet ? "lineTrugh" : ""}>
            {todo.discription}
          </p>
        ) : (
          <input
            type="text"
            onChange={(e) => setEditInputValu(e.target.value)}
            value={editInputValu}
          />
        )}
      </div>
      <div>
        <button onClick={updateTodo}>{todo.isEdite ? "Update" : "Edit"}</button>
      </div>
      <div>
        <button onClick={handeleDelet}>Delete</button>
      </div>
    </li>
  );
}
