import { client } from './graphqlClient';
import { useCallback } from 'react';

export const useMutationGraphQL = () => {
  const mutate = useCallback(async (mutation, variables = {}) => {
    try {
      const response = await client.request(mutation, variables);
      return { data: response, error: null };
    } catch (error) {
      console.error('Mutation error:', error);
      return { data: null, error };
    }
  }, []);

  return { mutate };
};
