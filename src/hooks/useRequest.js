import { useState, useCallback } from 'react';
import axios from 'axios';

const useRequest = (initialState = null) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (settings = {}, callback = null) => {
    const { url, method = 'GET', body = null, config = {} } = settings;
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url,
        method,
        data: body,
        ...config,
      });
      
      const result = callback ? callback(response) : response.data;
      setData(result);
      
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, sendRequest };
};

export default useRequest;