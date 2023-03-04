import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TQueryClient } from '../..';

type GetCharactersAPI = () => Promise<Character[]>;
type UseGetCharacters = () => UseQueryResult<Character[], any>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const getCharactersAPI: GetCharactersAPI = async () => {
  const res = await request.get(API_ENDPOINT);
  return res.body;
};

export const useGetCharacters: UseGetCharacters = () => {
  const query = useQuery({ queryKey: ['characters'], queryFn: getCharactersAPI });
  return {
    ...query,
    invalidateQuery: (tqueryClient: TQueryClient) => {
      tqueryClient.invalidateQueries({ queryKey: ['characters'] });
    },
  };
};
