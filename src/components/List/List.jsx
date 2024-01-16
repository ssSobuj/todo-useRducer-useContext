import { useContext } from "react";
import { globalContext } from "../../globalContext/GlobalContextProvider";
import "./list.css";
import Listtodo from "../listItem/Listtodo";




export default function List() {
  const {
    state: { todos },
  } = useContext(globalContext);

  console.log();
  return (
    <ul className="list-container">
      {todos.map((todo) => (
        <Listtodo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
