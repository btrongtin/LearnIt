import axios from "axios";

const setAuthToken = (token) => {
  //có token => gắn token vô default header
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
