import axios from "axios";
import { useEffect, useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1/dashboard",
});
const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosInstance.get(url);
        setData(res.data);
        console.log(res);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};
export default useApi;
