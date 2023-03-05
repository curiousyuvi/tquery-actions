import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TQueryClient } from '../..';
import { API_ENDPOINT } from '../../API';

type GetCharactersAPI = () => Promise<Character[]>;
type UseGetCharacters = () => UseQueryResult<Character[], any>;
type InvalidateQuery = (tqueryClient: TQueryClient) => void;

const invalidateQuery: InvalidateQuery = (tqueryClient) => {
  tqueryClient.invalidateQueries({ queryKey: ['characters'] });
};

const getCharactersAPI: GetCharactersAPI = async () => {
  const res = await request.get(API_ENDPOINT);
  return res.body;
};

export const useGetCharacters: UseGetCharacters = () => {
  const query = useQuery({ queryKey: ['characters'], queryFn: getCharactersAPI });
  return {
    ...query,
    invalidateQuery,
  };
};
