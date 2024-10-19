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
      // Verifica se o erro tem uma resposta e se o status é 400, 500 ou 403
      if (err.response) {
        const { status } = err.response;
        if (status === 400 || status === 403 || status === 500) {
          setError(`Erro ${status}: ${err.response.data.message || err.message}`);
        } else {
          setError('Erro desconhecido. Tente novamente.');
        }
      } else {
        setError('Erro de conexão. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, sendRequest };
};

export default useRequest;
