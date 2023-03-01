import * as request from 'superagent';
import { Character } from '../../interfaces/Character';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

type CreateCharacterAPI = (character: Character) => Promise<Character>;
type UseCreateCharacter = (
  onSuccess?: () => void,
) => UseMutationResult<Character, unknown, Character, unknown>;

const API_ENDPOINT = 'https://characters-jsonserver.up.railway.app/characters';

const createCharacterAPI: CreateCharacterAPI = async (characeter) => {
  const res = await request.post(API_ENDPOINT).send(characeter);
  return res.body;
};

export const useCreateCharacter: UseCreateCharacter = (onSuccess) => {
  const mutation: UseMutationResult<Character, any, Character, any> = useMutation({
    mutationFn: createCharacterAPI,
    onSuccess,
  });

  return mutation;
};
