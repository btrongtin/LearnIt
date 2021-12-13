export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployurl";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";

export const STATISTIC_LOADED_SUCCESS = "STATISTIC_LOADED_SUCCESS";
export const STATISTIC_LOADED_FAIL = "STATISTIC_LOADED_FAIL";
