// src/graphql/useGraphQL.js
import { useState, useEffect, useCallback } from 'react';
import { client } from './graphqlClient';

export const useGraphQL = (query, variables = {}, options = { skip: false }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!options.skip);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await client.request(query, variables);
      setData(res);
      setError(null);
    } catch (err) {
      console.error('GraphQL error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [query, JSON.stringify(variables)]);

  useEffect(() => {
    if (!options.skip) {
      fetchData();
    }
  }, [fetchData, options.skip]);

  return { data, loading, error, refetch: fetchData };
};
