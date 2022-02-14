import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const userToken = localStorage.getItem("token");
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    if (userToken !== null) {
      localStorage.setItem("token", userToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
