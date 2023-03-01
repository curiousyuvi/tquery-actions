import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { useQuery } from '@tanstack/react-query';

type GetCharactersAPI = () => Promise<Character[]>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const getCharactersAPI: GetCharactersAPI = async () => {
  const res = await request.get(API_ENDPOINT);
  return res.body;
};

export const useGetCharacters = () => {
  const query = useQuery({ queryKey: ['characters'], queryFn: getCharactersAPI });
  return query;
};
