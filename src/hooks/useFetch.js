import { useEffect, useState } from "react";
import { get } from "axios";

const useFetch = (id) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    get(
      `${process.env.REACT_APP_URL_API}${id}${process.env.REACT_APP_URL_TYPE}${process.env.REACT_APP_API_KEY_2}`
    )
      .then(({ data }) => setTimeout(() => setData(data), 3000))
      //   .then(({ data }) => setData(data))
      .catch((err) => setError(err));
  }, [id]);

  return [data, error];
};

export default useFetch;
