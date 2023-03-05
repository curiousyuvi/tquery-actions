import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TQueryClient } from '../..';
import { API_ENDPOINT } from '../../API';

type GetCharacterAPI = (id: number) => Promise<Character>;
type UseGetCharacter = (id: number) => UseQueryResult<Character>;
type InvalidateQuery = (tqueryClient: TQueryClient, characterID: number) => void;

const invalidateQuery: InvalidateQuery = (tqueryClient, characterID) => {
  tqueryClient.invalidateQueries({ queryKey: ['characters', characterID] });
};

const getCharacterAPI: GetCharacterAPI = async (id) => {
  const res = await request.get(API_ENDPOINT + `/${id}`);
  return res.body;
};

export const useGetCharacter: UseGetCharacter = (id) => {
  const query = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterAPI(id),
  });
  return {
    ...query,
    invalidateQuery,
  };
};
