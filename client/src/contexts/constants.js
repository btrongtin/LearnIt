export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://floating-ocean-07585.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";

export const STATISTIC_LOADED_SUCCESS = "STATISTIC_LOADED_SUCCESS";
export const STATISTIC_LOADED_FAIL = "STATISTIC_LOADED_FAIL";

export const TODOS_LOADED_SUCCESS = "TODOS_LOADED_SUCCESS";
export const TODOS_LOADED_FAIL = "TODOS_LOADED_FAIL";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const FIND_TODO = "FIND_TODO";
