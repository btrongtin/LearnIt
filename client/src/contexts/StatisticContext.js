import { createContext, useReducer } from "react";
import { statisticReducer } from "../reducers/statisticReducer";
import {
  apiUrl,
  STATISTIC_LOADED_FAIL,
  STATISTIC_LOADED_SUCCESS,
} from "./constants";
import axios from "axios";

export const StatisticContext = createContext();

const StatisticContextProvider = ({ children }) => {
  //state
  const [statisticState, dispatch] = useReducer(statisticReducer, {
    postsNumByType: [],
    statisticLoading: true,
  });

  const getStatistic = async () => {
    try {
      const response = await axios.get(`${apiUrl}/statistic`);
      if (response.data.success) {
        const postsAmount = response.data.postsAmount;
        const prePostsByType = response.data.postsByType; // raw data from api, haven't formatted to type we want
        // format prePostsByType to type: [{"LEARNED": 4, "...":.., ...}]
        const postsByType = prePostsByType.reduce((accu, current) => {
          accu[current._id] = current.count;
          return accu;
        }, {});
        const formattedPostByType = [
          {
            type: "ALL",
            count: postsAmount,
            title: "are being tracked",
          },
          {
            type: "LEARNED",
            count: postsByType.LEARNED,
            title: "have learned successfully",
          },
          {
            type: "LEARNING",
            count: postsByType.LEARNING,
            title: "are being learned",
          },
          {
            type: "TO LEARN",
            count: postsByType["TO LEARN"], //TO LEARN have space so i use bracket notation to access it
            title: "are planned to learn",
          },
        ];
        dispatch({
          type: STATISTIC_LOADED_SUCCESS,
          payload: formattedPostByType,
        });
      }
    } catch (error) {
      dispatch({ type: STATISTIC_LOADED_FAIL });
    }
  };

  const StatisticContextData = {
    statisticState,
    getStatistic,
  };

  return (
    <StatisticContext.Provider value={StatisticContextData}>
      {children}
    </StatisticContext.Provider>
  );
};

export default StatisticContextProvider;
