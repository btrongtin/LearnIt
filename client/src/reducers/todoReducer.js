import {
  TODOS_LOADED_FAIL,
  TODOS_LOADED_SUCCESS,
  ADD_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  FIND_TODO,
} from "../contexts/constants";

export const todoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TODOS_LOADED_SUCCESS:
      return {
        ...state,
        todos: payload,
        todosLoading: false,
      };
    case TODOS_LOADED_FAIL:
      return {
        ...state,
        todos: [],
        todosLoading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
      };
    case FIND_TODO:
      return {
        ...state,
        todo: payload,
      };
    case UPDATE_TODO:
      const newTodos = state.todos.map((todo) =>
        todo._id === payload._id ? payload : todo
      );
      return {
        ...state,
        todos: newTodos,
      };
    default:
      return state;
  }
};
