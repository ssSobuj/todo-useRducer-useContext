/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { globalContext } from "../../globalContext/GlobalContextProvider";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImRadioUnchecked } from "react-icons/im";

import Swal from "sweetalert2";
import "./Listtodo.css";
import { FiEdit } from "react-icons/fi";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin7Fill } from "react-icons/ri";

export default function Listtodo({ todo }) {
  const [editInputValu, setEditInputValu] = useState(todo.discription);
  const { dispatch } = useContext(globalContext);
  const togoleIscomplete = () =>
    dispatch({ type: "COMPLET_TODO", payload: todo.id });

  const handeleDelet = () => {
    dispatch({ type: "DELET_TODO", payload: todo.id });
  };

  const inputHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      updateTodo();
    }
    setEditInputValu(e.target.value);
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

    if (editInputValu.trim().length === 0) {
      Swal.fire({
        title: "Error!",
        text: "give some text",
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
    <>{
      
    
    }
      <li key={todo.discription + todo.id}>
        <div>
          {todo.isComplet ? (
            <FaRegCircleCheck
              className="icon unchek"
              onClick={togoleIscomplete}
            />
          ) : (
            <ImRadioUnchecked className="icon" onClick={togoleIscomplete} />
          )}
        </div>
        <div className="todo-discription">
          {!todo.isEdite ? (
            <p className={todo.isComplet ? "lineTrugh" : ""}>
              {todo.discription}
            </p>
          ) : (
            <input
              type="text"
              onChange={(e) => inputHandler(e)}
              onKeyUp={(e) => inputHandler(e)}
              maxLength={40}
              value={editInputValu}
            />
          )}
        </div>
        <div>
          {todo.isEdite ? (
            <GrDocumentUpdate className="icon" onClick={updateTodo} />
          ) : (
            <FiEdit className="icon" onClick={updateTodo} />
          )}
          <RiDeleteBin7Fill className="icon delete" onClick={handeleDelet} />
        </div>
      </li>
    </>
  );
}
