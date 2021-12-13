import {
  STATISTIC_LOADED_SUCCESS,
  STATISTIC_LOADED_FAIL,
} from "../contexts/constants";

export const statisticReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case STATISTIC_LOADED_SUCCESS:
      return {
        ...state,
        postsNumByType: payload,
        statisticLoading: false,
      };
    case STATISTIC_LOADED_FAIL:
      return {
        ...state,
        numOfPosts: 0,
        postsNumByType: [],
        statisticLoading: false,
      };

    default:
      return state;
  }
};
