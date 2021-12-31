import { createContext, useReducer, useState } from "react";
import { todoReducer } from "../reducers/todoReducer";
import {
  apiUrl,
  TODOS_LOADED_FAIL,
  TODOS_LOADED_SUCCESS,
  DELETE_TODO,
  ADD_TODO,
  FIND_TODO,
  UPDATE_TODO,
} from "./constants";
import axios from "axios";

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  //state
  const [todoState, dispatch] = useReducer(todoReducer, {
    todo: { title: "" }, //use to get todo to edit
    todos: [],
    todosLoading: true,
  });

  //   const [showAddPostModal, setShowAddPostModal] = useState(false);
  //   const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  //   const [showToast, setShowToast] = useState({
  //     show: false,
  //     message: "",
  //     type: null,
  //   });

  const getTodos = async (todoId) => {
    try {
      const response = await axios.get(`${apiUrl}/todo/${todoId}`);
      if (response.data.success) {
        dispatch({
          type: TODOS_LOADED_SUCCESS,
          payload: response.data.todos,
        });
      }
    } catch (error) {
      dispatch({ type: TODOS_LOADED_FAIL });
    }
  };

  // Add todo
  const addTodo = async (newTodo, postId) => {
    try {
      const response = await axios.post(`${apiUrl}/todo/${postId}`, newTodo);
      if (response.data.success) {
        dispatch({
          type: ADD_TODO,
          payload: response.data.todo,
          todo: newTodo,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data // server có trả về lỗi có chủ đích
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete todo
  const deleteTodo = async (todoId, postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/todo/${postId}/${todoId}`);
      if (response.data.success)
        dispatch({ type: DELETE_TODO, payload: todoId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find todo when user is updating todo
  const findTodo = (todoId) => {
    const todo = todoState.todos.find((todo) => todo._id === todoId);
    dispatch({ type: FIND_TODO, payload: todo });
  };

  // Update todo
  const updateTodo = async (todoId, postId) => {
    try {
      const response = await axios.put(`${apiUrl}/todo/${postId}/${todoId}`);
      if (response.data.success) {
        dispatch({ type: UPDATE_TODO, payload: response.data.todo });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const todoContextData = {
    todoState,
    getTodos,
    deleteTodo,
    updateTodo,
    findTodo,
    addTodo,
  };

  return (
    <TodoContext.Provider value={todoContextData}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
