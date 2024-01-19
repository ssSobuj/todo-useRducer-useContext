export const todoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_VALUE":
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case "COMPLET_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload ? { ...todo, isComplet: !todo.isComplet } : todo
        ),
      };
    case "DELET_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    case "ISEDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === payload.id) {
            return {
              ...todo,
              isEdite: !todo.isEdite,
              discription: payload.editInputValu,
            };
          }
          return todo;
        }),
      };

    default:
      return state;
  }
};
