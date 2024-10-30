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
        url: 'https://nfba1cx8uf.execute-api.sa-east-1.amazonaws.com/production/' + url,
        method,
        data: body,
        timeout: 15000,
        config,
      });

      const data = JSON.parse(response.data.body);
      
      const result = callback ? callback(data) : data;
      setData(result);

    } catch (err) {
      console.log(err);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400 || status === 403 || status === 500) {
          const message = data.message || 'Erro não especificado';
          const errors = data.errors || [];
          const details = data.details || 'Sem detalhes adicionais';
          setError(`Erro ${status}: ${message}. ${details}`);
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
