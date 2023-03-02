import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

type GetCharacterAPI = (id: number) => Promise<Character>;
type UseGetCharacter = (id: number) => UseQueryResult<Character, any>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const getCharacterAPI: GetCharacterAPI = async (id) => {
  const res = await request.get(API_ENDPOINT + `/${id}`);
  return res.body;
};

export const useGetCharacter: UseGetCharacter = (id) => {
  const query = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterAPI(id),
  });
  return query;
};
